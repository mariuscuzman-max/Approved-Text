import assert from 'node:assert/strict';
import { getWordById } from '../src/data/words.ts';
import { createDefaultState, mergeSavedState } from '../src/utils/gameState.ts';
import { getHundredMeaningUnlockWordIds } from '../src/utils/milestones.ts';
import { canTriggerDreamUnlock } from '../src/utils/dream.ts';
import {
  FIRST_VERB_WORKBENCH_SLOT,
  STARTING_WORKBENCH_SLOT,
  createDefaultWorkbenchBoard,
  moveWorkbenchWordToSlot,
  parseWorkbenchSentence,
  unlockWorkbenchSlotsForProgress,
} from '../src/utils/workbench.ts';
import {
  applyUpgradeCostFloor,
  getActiveWordTapMultiplier,
  getEffectiveFilingUpgradeBonus,
  getEffectiveFilingUpgradeCost,
  getEffectiveStampUpgradeBonus,
  getEffectiveStampUpgradeCost,
  getPassiveGain,
  getRootCharge,
  getRootChargeLabel,
  getTapGain,
} from '../src/utils/upgrades.ts';
import {
  getEventSpawnMultiplier,
  getFlowEventIdleMultiplier,
  getMeaningBloomGain,
  getNextPathEventDelayMs,
  getSoftenedRulesUpgradeCostMultiplier,
} from '../src/utils/pathEvents.ts';
import { shouldStampFromPointerInteraction } from '../src/utils/stampInput.ts';
import type { GameState, WorkbenchBoard } from '../src/types/game.ts';

function nearlyEqual(actual: number, expected: number): void {
  assert.ok(
    Math.abs(actual - expected) < 0.000001,
    `Expected ${actual} to equal ${expected}`,
  );
}

const seed = getWordById('seed');
const water = getWordById('water');
const rain = getWordById('rain');
const soil = getWordById('soil');
const root = getWordById('root');
const river = getWordById('river');
const stream = getWordById('stream');
const understand = getWordById('understand');
const world = getWordById('world');
const slumber = getWordById('slumber');

const defaultState = createDefaultState();
assert.equal(defaultState.activeNounId, 'world');
assert.equal(defaultState.activeWordId, 'world');
assert.deepEqual(defaultState.unlockedWordIds, ['world']);
assert.deepEqual(defaultState.workbenchBoard.unlockedSlots, [STARTING_WORKBENCH_SLOT]);
assert.equal(defaultState.workbenchBoard.placements.world, STARTING_WORKBENCH_SLOT);

assert.equal(shouldStampFromPointerInteraction({ movementDistance: 0 }), true);
assert.equal(shouldStampFromPointerInteraction({ movementDistance: 5 }), true);
assert.equal(shouldStampFromPointerInteraction({ movementDistance: 9 }), false);
assert.equal(shouldStampFromPointerInteraction({ movementDistance: 0, isControlTarget: true }), false);
assert.equal(shouldStampFromPointerInteraction({ movementDistance: 0, isNoStampTarget: true }), false);
assert.equal(shouldStampFromPointerInteraction({ movementDistance: 0, dragWasActive: true }), false);

assert.equal(understand.unlockMeaning, 100);
assert.equal(understand.type, 'verb');
assert.equal(understand.specialEffectType, 'double_noun_base');
assert.deepEqual(getHundredMeaningUnlockWordIds('farm'), ['grow', 'understand']);
assert.deepEqual(getHundredMeaningUnlockWordIds('water'), ['flow', 'understand']);
nearlyEqual(water.passiveValue, 0.003);
nearlyEqual(rain.passiveValue, 0.006);
nearlyEqual(world.tapValue, 0.01);
assert.equal(world.implemented, true);
assert.equal(slumber.type, 'noun');
assert.equal(slumber.specialEffectType, 'event_spawn_bonus');
nearlyEqual(slumber.specialEffectValue ?? 0, 0.3);
nearlyEqual(getEventSpawnMultiplier(slumber), 1.3);

const oldNounSave = {
  meaning: 12,
  activeWordId: 'seed',
  unlockedWordIds: ['apple', 'farm', 'seed'],
  chosenFirstPath: 'farm',
  passiveMeaningPerSecond: 0,
  tenMeaningMilestoneGranted: true,
  stampUpgradeLevel: 0,
  filingUpgradeLevel: 0,
  lastSavedAt: null,
} as unknown as GameState;

const migratedNounSave = mergeSavedState(oldNounSave);
assert.equal(migratedNounSave.activeNounId, 'seed');
assert.equal(migratedNounSave.activeVerbId, null);
assert.ok(migratedNounSave.unlockedWordIds.includes('world'));
assert.ok(!migratedNounSave.unlockedWordIds.includes('apple'));

const oldStarterSave = mergeSavedState({
  ...oldNounSave,
  activeWordId: 'apple',
  activeNounId: 'apple',
  unlockedWordIds: ['apple'],
  chosenFirstPath: null,
} as unknown as GameState);
assert.equal(oldStarterSave.activeNounId, 'world');
assert.equal(oldStarterSave.activeWordId, 'world');
assert.deepEqual(oldStarterSave.unlockedWordIds, ['world']);

const oldVerbSave = {
  ...oldNounSave,
  activeWordId: 'grow',
  unlockedWordIds: ['apple', 'farm', 'seed', 'soil', 'root', 'grow'],
  hundredMeaningMilestoneGranted: true,
} as unknown as GameState;

const migratedVerbSave = mergeSavedState(oldVerbSave);
assert.equal(migratedVerbSave.activeNounId, 'world');
assert.equal(migratedVerbSave.activeVerbId, 'grow');
assert.ok(migratedVerbSave.unlockedWordIds.includes('understand'));
assert.deepEqual(migratedVerbSave.workbenchLayout, {
  noun: { xPercent: 7, yPercent: 14 },
  verb: { xPercent: 47, yPercent: 14 },
});

const dreamSave = mergeSavedState({
  ...oldNounSave,
  activeWordId: 'world',
  activeNounId: 'world',
  activeVerbId: 'understand',
  unlockedWordIds: ['world', 'farm', 'understand'],
  meaning: 100,
  dreamUnlocked: true,
  totalMeaningEarned: 150,
} as unknown as GameState);
assert.equal(dreamSave.dreamUnlocked, true);
assert.ok(dreamSave.unlockedWordIds.includes('slumber'));
assert.equal(dreamSave.totalMeaningEarned, 150);

assert.equal(canTriggerDreamUnlock(99.99, world, understand, false), false);
assert.equal(canTriggerDreamUnlock(100, world, understand, false), true);
assert.equal(canTriggerDreamUnlock(100, seed, understand, false), false);
assert.equal(canTriggerDreamUnlock(100, world, null, false), false);
assert.equal(canTriggerDreamUnlock(100, world, understand, true), false);

const unlockedTwoSlotBoard = unlockWorkbenchSlotsForProgress(createDefaultWorkbenchBoard(), 100);
assert.deepEqual(unlockedTwoSlotBoard.unlockedSlots, [0, 1]);
assert.equal(unlockWorkbenchSlotsForProgress(createDefaultWorkbenchBoard(), 99).unlockedSlots.includes(1), false);

const lockedMove = moveWorkbenchWordToSlot(createDefaultWorkbenchBoard(), 'world', 1);
assert.equal(lockedMove.moved, false);
assert.equal(lockedMove.board.placements.world, 0);

const understandWorldBoard = {
  unlockedSlots: [0, 1],
  placements: {
    understand: 0,
    world: 1,
  },
} as WorkbenchBoard;
const parsedUnderstandWorld = parseWorkbenchSentence(understandWorldBoard, 'world');
assert.equal(parsedUnderstandWorld.activeNounId, 'world');
assert.equal(parsedUnderstandWorld.effectiveVerbId, 'understand');
assert.equal(parsedUnderstandWorld.feedback, 'Sentence: Understand World');
assert.equal(canTriggerDreamUnlock(100, getWordById(parsedUnderstandWorld.activeNounId), understand, false), true);
nearlyEqual(getTapGain(world, 0, understand), 0.02);

const worldUnderstandBoard = {
  unlockedSlots: [0, 1],
  placements: {
    world: 0,
    understand: 1,
  },
} as WorkbenchBoard;
const parsedWorldUnderstand = parseWorkbenchSentence(worldUnderstandBoard, 'world');
assert.equal(parsedWorldUnderstand.activeNounId, 'world');
assert.equal(parsedWorldUnderstand.effectiveVerbId, null);
assert.equal(parsedWorldUnderstand.feedback, 'Sentence inactive: place a verb before a noun.');
assert.equal(canTriggerDreamUnlock(100, getWordById(parsedWorldUnderstand.activeNounId), null, false), false);
nearlyEqual(getTapGain(world, 0, null), 0.01);

const understandRootBoard = {
  unlockedSlots: [0, 1],
  placements: {
    understand: 0,
    root: 1,
  },
} as WorkbenchBoard;
const parsedUnderstandRoot = parseWorkbenchSentence(understandRootBoard, 'root');
assert.equal(parsedUnderstandRoot.activeNounId, 'root');
assert.equal(parsedUnderstandRoot.effectiveVerbId, 'understand');
assert.equal(getActiveWordTapMultiplier(root, 25, understand), 10);

const rootUnderstandBoard = {
  unlockedSlots: [0, 1],
  placements: {
    root: 0,
    understand: 1,
  },
} as WorkbenchBoard;
const parsedRootUnderstand = parseWorkbenchSentence(rootUnderstandBoard, 'root');
assert.equal(parsedRootUnderstand.activeNounId, 'root');
assert.equal(parsedRootUnderstand.effectiveVerbId, null);
assert.equal(getActiveWordTapMultiplier(root, 25, null), 5);

const swappedBoard = moveWorkbenchWordToSlot(understandWorldBoard, 'world', 0);
assert.equal(swappedBoard.moved, true);
assert.equal(swappedBoard.board.placements.world, 0);
assert.equal(swappedBoard.board.placements.understand, 1);

const layoutSave = mergeSavedState({
  ...oldNounSave,
  workbenchLayout: {
    noun: { xPercent: 12, yPercent: 22 },
    verb: { xPercent: 55, yPercent: 18 },
  },
} as unknown as GameState);
assert.deepEqual(layoutSave.workbenchLayout, {
  noun: { xPercent: 12, yPercent: 22 },
  verb: { xPercent: 55, yPercent: 18 },
});

const boardSave = mergeSavedState({
  ...oldNounSave,
  activeWordId: 'world',
  activeNounId: 'world',
  activeVerbId: 'understand',
  unlockedWordIds: ['world', 'understand'],
  meaning: 100,
  workbenchBoard: understandWorldBoard,
} as unknown as GameState);
assert.equal(boardSave.workbenchBoard.placements.understand, 0);
assert.equal(boardSave.workbenchBoard.placements.world, 1);

const seedStampBonus = getEffectiveStampUpgradeBonus(10, seed);
nearlyEqual(seedStampBonus, 0.022);
nearlyEqual(getTapGain(seed, 10), (0.03 + seedStampBonus) * 1.25);
const understoodSeedStampBonus = getEffectiveStampUpgradeBonus(10, seed, understand);
nearlyEqual(understoodSeedStampBonus, 0.024);
nearlyEqual(getTapGain(seed, 10, understand), (0.03 * 2 + understoodSeedStampBonus) * 1.25);

const rainFilingBonus = getEffectiveFilingUpgradeBonus(10, rain);
nearlyEqual(rainFilingBonus, 0.022);
nearlyEqual(getPassiveGain(rain, 10, 0, 0), (0.006 + rainFilingBonus) * 1.25);
const understoodRainFilingBonus = getEffectiveFilingUpgradeBonus(10, rain, understand);
nearlyEqual(understoodRainFilingBonus, 0.024);
nearlyEqual(getPassiveGain(rain, 10, 0, 0, understand), (0.006 * 2 + understoodRainFilingBonus) * 1.25);

nearlyEqual(getEffectiveStampUpgradeCost(0, soil), 0.95);
nearlyEqual(getEffectiveStampUpgradeCost(0, soil, understand), 0.9);
nearlyEqual(getEffectiveFilingUpgradeCost(0, stream), 0.95);
nearlyEqual(getEffectiveFilingUpgradeCost(0, stream, understand), 0.9);
nearlyEqual(getEffectiveStampUpgradeCost(0, soil, understand, 0.75), 0.675);
nearlyEqual(getEffectiveFilingUpgradeCost(0, stream, understand, 0.75), 0.675);
nearlyEqual(applyUpgradeCostFloor(1, 0.01), 0.25);
nearlyEqual(applyUpgradeCostFloor(0.2, 0.01), 0.1);

assert.equal(getActiveWordTapMultiplier(root, 24), 1);
assert.equal(getActiveWordTapMultiplier(root, 25), 5);
assert.equal(getActiveWordTapMultiplier(root, 26), 1);
assert.equal(getActiveWordTapMultiplier(root, 24, understand), 1);
assert.equal(getActiveWordTapMultiplier(root, 25, understand), 10);
assert.equal(getActiveWordTapMultiplier(root, 26, understand), 1);
assert.equal(getRootCharge(24), 24);
assert.equal(getRootCharge(25), 0);
assert.equal(getRootCharge(26), 1);
assert.equal(getRootChargeLabel(24), '24/25');
assert.equal(getRootChargeLabel(25), '0/25');
assert.equal(getRootChargeLabel(26), '1/25');

nearlyEqual(getPassiveGain(river, 0, 0, 120000), 0.02 * 1.25 * 1.02);
nearlyEqual(getPassiveGain(river, 0, 0, 120000, understand), (0.02 * 2) * 1.25 * 1.04);

const clearCurrentEvent = {
  type: 'water',
  name: 'Clear Current',
  endsAt: Date.now() + 1000,
} as const;

nearlyEqual(getFlowEventIdleMultiplier(clearCurrentEvent, 0), 1.1);
nearlyEqual(getFlowEventIdleMultiplier(clearCurrentEvent, 50), 1.5);
nearlyEqual(getFlowEventIdleMultiplier(clearCurrentEvent, 100), 2);
nearlyEqual(getFlowEventIdleMultiplier(clearCurrentEvent, 150), 2);

const softenedRulesEvent = {
  type: 'dream-softened-rules',
  name: 'Softened Rules',
  endsAt: Date.now() + 1000,
} as const;

nearlyEqual(getSoftenedRulesUpgradeCostMultiplier(null), 1);
nearlyEqual(getSoftenedRulesUpgradeCostMultiplier(softenedRulesEvent), 0.75);
nearlyEqual(getMeaningBloomGain(1000, 1), 100);
nearlyEqual(getMeaningBloomGain(10, 2), 20);

const originalRandom = Math.random;
try {
  Math.random = () => 0;
  nearlyEqual(getNextPathEventDelayMs(10), 90000);
} finally {
  Math.random = originalRandom;
}

console.log('game logic tests passed');
