import assert from 'node:assert/strict';
import { getUnlockedWords, getWordById, words } from '../src/data/words.ts';
import { createDefaultState, mergeSavedState } from '../src/utils/gameState.ts';
import {
  add,
  eq,
  formatMeaning,
  formatRate,
  gte,
  isDecimal,
  mul,
  sub,
  toDecimal,
} from '../src/utils/bigNumber.ts';
import type { BigNumberSource } from '../src/utils/bigNumber.ts';
import { parseSavedGameState, serializeGameState } from '../src/utils/storage.ts';
import {
  getDreamMilestoneUnlockWordIds,
  getHundredMeaningUnlockWordIds,
  getThousandMeaningUnlockWordIds,
  getTwoHundredFiftyMeaningUnlockWordIds,
} from '../src/utils/milestones.ts';
import { canTriggerDreamUnlock, unlockDreamLayer } from '../src/utils/dream.ts';
import {
  FIRST_VERB_WORKBENCH_SLOT,
  STARTING_WORKBENCH_SLOT,
  THIRD_WORKBENCH_SLOT,
  WORKBENCH_GRID_COLUMNS,
  WORKBENCH_GRID_ROWS,
  WORKBENCH_SLOT_COUNT,
  createDefaultWorkbenchBoard,
  getNearestWorkbenchSlot,
  getAndTokenId,
  isWorkbenchGridSlot,
  isWorkbenchTokenId,
  moveWorkbenchWordToSlot,
  parseWorkbenchSentence,
  placeAdditionalNoun,
  placeOwnedAndConnector,
  unlockWorkbenchSlotsForProgress,
} from '../src/utils/workbench.ts';
import {
  applyFilingDepth,
  applyStampForce,
  applyUpgradeCostFloor,
  getActiveWordPassiveMultiplier,
  getActiveWordPowerLabel,
  getActiveWordTapMultiplier,
  getEffectiveFilingUpgradeBonus,
  getEffectiveFilingUpgradeCost,
  getEffectiveStampUpgradeBonus,
  getEffectiveStampUpgradeCost,
  getPassiveGain,
  getPercentageUpgradeCost,
  getPercentageUpgradeMultiplier,
  getRiverPassiveIncrease,
  getRootCharge,
  getRootChargeLabel,
  getTapGain,
  getUpgradeCost,
  isPercentageUpgradeUnlocked,
  PERCENTAGE_UPGRADE_UNLOCK_MEANING,
  RIVER_PASSIVE_GROWTH_CAP,
} from '../src/utils/upgrades.ts';
import {
  createFacedownTruthActiveEvent,
  createVisiblePathEvent,
  createWheelTimedActiveEvent,
  FACEDOWN_TRUTH_DURATION_SECONDS,
  FACEDOWN_TRUTH_REWARDS,
  getEventSpawnMultiplier,
  getAvailableEventTypes,
  getDreamProductionMultiplier,
  getFacedownTruthProductionMultiplier,
  getFarmEventTapMultiplier,
  getFlowEventIdleMultiplier,
  getMeaningBloomGain,
  MIN_EVENT_DELAY_SECONDS,
  getNextPathEventDelayMs,
  getRandomVisibleEventType,
  getSoftenedRulesUpgradeCostMultiplier,
  getWheelInstantMeaningGain,
  selectWheelOfMeaningReward,
  selectFacedownTruthMultiplier,
  WHEEL_OF_MEANING_REWARDS,
  WHEEL_TIMED_MULTIPLIER_DURATION_SECONDS,
} from '../src/utils/pathEvents.ts';
import { shouldStampFromPointerInteraction } from '../src/utils/stampInput.ts';
import type { GameState, WorkbenchBoard } from '../src/types/game.ts';
import { gameQuotes, selectQuoteIndex } from '../src/data/quotes.ts';
import { FIRST_CHOICE_COST, isFirstPathChoiceUnlocked } from '../src/utils/progression.ts';
import { AND_BASE_COST, AND_COST_SCALE, getAndPurchaseCost } from '../src/utils/connectors.ts';
import {
  getActiveAndProductionMultiplier,
  getActiveStreamClause,
  FLOW_SURGE_DURATION_SECONDS,
  FLOW_SURGE_PRODUCTION_MULTIPLIER,
  FLOW_TRIGGER_INTERVAL_SECONDS,
  getFlowSurgeMultiplier,
  getGrowClauseTapBonus,
  GROW_CURRENT_MEANING_PERCENT,
  hasActiveSentenceVerb,
  getSentenceClauseProduction,
  getSentenceEventSpawnMultiplier,
  getSentenceFilingUpgradeBonus,
  getSentenceFilingUpgradeCost,
  getSentencePassiveGain,
  getSentenceStampUpgradeBonus,
  getSentenceStampUpgradeCost,
  getSentenceTapGain,
} from '../src/utils/sentenceProduction.ts';
import {
  getModifierConnectionColor,
  getWordConnectionDisplay,
} from '../src/utils/sentenceConnections.ts';
import {
  createDefaultGlobalStats,
  createDefaultSessionStats,
  getTrackedMeaningTotal,
  mergeGlobalStats,
  recordEventClaim,
  recordPassiveGain,
  recordTap,
  recordUpgradePurchase,
} from '../src/utils/stats.ts';
import {
  getStreamDrizzleGain,
  getStreamDrizzlePassiveSeconds,
  isStreamDrizzleActive,
  STREAM_DRIZZLE_INTERVAL_SECONDS,
  STREAM_DRIZZLE_PASSIVE_SECONDS,
  UNDERSTAND_STREAM_DRIZZLE_PASSIVE_SECONDS,
} from '../src/utils/stream.ts';

function nearlyEqual(actual: BigNumberSource, expected: BigNumberSource): void {
  assert.ok(
    toDecimal(sub(actual, expected)).abs().lt(0.000001),
    `Expected ${toDecimal(actual).toString()} to equal ${toDecimal(expected).toString()}`,
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
const heavy = getWordById('heavy');
const still = getWordById('still');
const grow = getWordById('grow');
const flow = getWordById('flow');

assert.equal(FIRST_CHOICE_COST, 1);
assert.equal(isFirstPathChoiceUnlocked(0.99), false);
assert.equal(isFirstPathChoiceUnlocked(1), true);
assert.equal(isFirstPathChoiceUnlocked(2), true);
assert.equal(getWordById('farm').unlockMeaning, 1);
assert.equal(getWordById('farm').unlockCost, 1);
assert.equal(getWordById('water').unlockMeaning, 1);
assert.equal(getWordById('water').unlockCost, 1);
assert.equal(grow.implemented, true);
assert.equal(grow.specialEffectType, 'current_meaning_tap_bonus');
nearlyEqual(grow.specialEffectValue ?? 0, 0.005);
assert.equal(flow.implemented, true);
assert.equal(flow.specialEffectType, 'timed_idle_surge');
nearlyEqual(flow.specialEffectValue ?? 0, 1.5);

assert.ok(gameQuotes.length > 0);
for (const quote of gameQuotes) {
  assert.ok(quote.text.length > 0);
  assert.ok(quote.author.length > 0);
}
assert.equal(selectQuoteIndex(gameQuotes.length, null, 0), 0);
assert.notEqual(selectQuoteIndex(gameQuotes.length, 0, 0), 0);
assert.equal(selectQuoteIndex(0), -1);

const wordIds = words.map((word) => word.id);
assert.equal(new Set(wordIds).size, wordIds.length);

for (const word of words) {
  assert.ok(word.id.length > 0);
  assert.ok(word.text.length > 0);
  assert.ok(['noun', 'verb', 'adjective', 'connector'].includes(word.type));
  assert.ok(word.pathId.length > 0);
  assert.ok(word.pathLabel.length > 0);
  assert.ok(word.pathTheme.length > 0);
  assert.ok(word.description.length > 0);
  assert.ok(word.effectDescription.length > 0);
  assert.ok(Number.isFinite(word.unlockMeaning) && word.unlockMeaning >= 0);
  assert.ok(Number.isFinite(word.tapValue) && word.tapValue >= 0);
  assert.ok(Number.isFinite(word.passiveValue) && word.passiveValue >= 0);
  assert.equal(typeof word.implemented, 'boolean');
}

const requiredPlannedWordIds = [
  'harvest',
  'season',
  'ice',
  'pour',
  'echo',
  'clock',
  'remember',
  'acquire',
  'omen',
  'lucid',
  'mirror',
  'nightmare',
  'miracle',
  'accident',
] as const;

for (const wordId of requiredPlannedWordIds) {
  const plannedWord = getWordById(wordId);
  assert.equal(plannedWord.implemented, false);
  assert.equal(getActiveWordPowerLabel(plannedWord), null);
  assert.equal(getActiveWordTapMultiplier(plannedWord, 25), 1);
  assert.equal(getActiveWordPassiveMultiplier(plannedWord, 0, 60000), 1);
  assert.equal(getEventSpawnMultiplier(plannedWord), 1);
}

const defaultState = createDefaultState();
assert.equal(isDecimal(defaultState.meaning), true);
nearlyEqual(defaultState.meaning, 0);
assert.equal(defaultState.activeNounId, 'world');
assert.equal(defaultState.activeWordId, 'world');
assert.deepEqual(defaultState.unlockedWordIds, ['world']);
assert.deepEqual(defaultState.workbenchBoard.unlockedSlots, [STARTING_WORKBENCH_SLOT]);
assert.equal(defaultState.workbenchBoard.placements.world, STARTING_WORKBENCH_SLOT);
const defaultDictionaryWordIds = getUnlockedWords(defaultState.unlockedWordIds).map((word) => word.id);
assert.deepEqual(defaultDictionaryWordIds, ['world']);
assert.equal(requiredPlannedWordIds.some((wordId) => defaultDictionaryWordIds.includes(wordId)), false);
nearlyEqual(defaultState.stats.meaningEarnedFromTapping, 0);
nearlyEqual(defaultState.stats.meaningEarnedFromPassive, 0);
nearlyEqual(defaultState.stats.meaningEarnedFromEvents, 0);
assert.equal(defaultState.stats.manualStamps, 0);
assert.equal(defaultState.stats.totalPlayTimeMs, 0);
assert.equal(defaultState.stampForceLevel, 0);
assert.equal(defaultState.filingDepthLevel, 0);
assert.equal(defaultState.activeAdjectiveId, null);
assert.equal(defaultState.thousandMeaningMilestoneGranted, false);
assert.equal(defaultState.andOwnedCount, 0);

const defaultSessionStats = createDefaultSessionStats(1000);
assert.equal(defaultSessionStats.startedAt, 1000);
assert.equal(defaultSessionStats.manualStamps, 0);

const tappedGlobalStats = recordTap(createDefaultGlobalStats(), 2.5);
assert.equal(tappedGlobalStats.manualStamps, 1);
nearlyEqual(tappedGlobalStats.meaningEarnedFromTapping, 2.5);
nearlyEqual(tappedGlobalStats.bestSingleTapGain, 2.5);

const passiveGlobalStats = recordPassiveGain(tappedGlobalStats, 1.25, 3.5);
nearlyEqual(passiveGlobalStats.meaningEarnedFromPassive, 1.25);
nearlyEqual(passiveGlobalStats.bestMeaningPerSecond, 3.5);

const eventGlobalStats = recordEventClaim(passiveGlobalStats, 'dream-bloom', 10);
assert.equal(eventGlobalStats.eventsClaimed, 1);
assert.equal(eventGlobalStats.eventClaims['dream-bloom'], 1);
nearlyEqual(eventGlobalStats.meaningEarnedFromEvents, 10);
nearlyEqual(getTrackedMeaningTotal(eventGlobalStats), 13.75);
assert.equal(recordUpgradePurchase(eventGlobalStats).upgradesBought, 1);

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
const andWord = getWordById('and');
assert.equal(andWord.type, 'connector');
assert.equal(andWord.unlockMeaning, 250);
assert.equal(andWord.implemented, true);
nearlyEqual(andWord.tapValue, 0.3);
nearlyEqual(andWord.passiveValue, 0.3);
assert.equal(andWord.specialEffectType, 'connector_production_multiplier');
nearlyEqual(andWord.specialEffectValue ?? 0, 1.1);
assert.equal(AND_BASE_COST, 250);
assert.equal(AND_COST_SCALE, 100);
nearlyEqual(getAndPurchaseCost(0), 250);
nearlyEqual(getAndPurchaseCost(1), 25000);
nearlyEqual(getAndPurchaseCost(2), 2500000);
assert.deepEqual(getTwoHundredFiftyMeaningUnlockWordIds(), ['and']);
assert.deepEqual(getThousandMeaningUnlockWordIds(), ['heavy', 'still']);
assert.equal(heavy.type, 'adjective');
assert.equal(heavy.unlockMeaning, 1000);
assert.equal(heavy.implemented, true);
assert.equal(still.type, 'adjective');
assert.equal(still.unlockMeaning, 1000);
assert.equal(still.implemented, true);
assert.equal(getWordById('clock').unlockMeaning, 1000);
assert.equal(getWordById('oak').unlockMeaning, 2000);
assert.equal(getWordById('lake').unlockMeaning, 2000);
assert.deepEqual(getDreamMilestoneUnlockWordIds(249, true), []);
assert.deepEqual(getDreamMilestoneUnlockWordIds(250, false), []);
assert.deepEqual(getDreamMilestoneUnlockWordIds(250, true), ['echo']);
assert.deepEqual(getDreamMilestoneUnlockWordIds(999, true), ['echo']);
assert.deepEqual(getDreamMilestoneUnlockWordIds(1000, false), []);
assert.deepEqual(getDreamMilestoneUnlockWordIds(1000, true), ['echo', 'clock']);
nearlyEqual(water.passiveValue, 0.003);
nearlyEqual(rain.passiveValue, 0.006);
nearlyEqual(world.tapValue, 0.01);
assert.equal(world.implemented, true);
assert.equal(slumber.type, 'noun');
assert.equal(slumber.specialEffectType, 'event_spawn_bonus');
nearlyEqual(slumber.specialEffectValue ?? 0, 0.3);
nearlyEqual(getEventSpawnMultiplier(slumber), 1.3);
nearlyEqual(getEventSpawnMultiplier(slumber, understand), 1.6);
nearlyEqual(getTapGain(slumber, 0), 0.03);
nearlyEqual(getPassiveGain(slumber, 0, 0, 0), 0.03);
nearlyEqual(getTapGain(slumber, 0, understand), 0.06);
nearlyEqual(getPassiveGain(slumber, 0, 0, 0, understand), 0.06);
assert.equal(MIN_EVENT_DELAY_SECONDS, 90);
assert.equal(getUnlockedWords(defaultState.unlockedWordIds).some((word) => word.id === 'slumber'), false);

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
assert.notEqual(parseSavedGameState(oldNounSave), null);
nearlyEqual(migratedNounSave.meaning, 12);
assert.equal(migratedNounSave.activeNounId, 'seed');
assert.equal(migratedNounSave.activeVerbId, null);
assert.ok(migratedNounSave.unlockedWordIds.includes('world'));
assert.ok(!migratedNounSave.unlockedWordIds.includes('apple'));
assert.equal(migratedNounSave.stampForceLevel, 0);
assert.equal(migratedNounSave.filingDepthLevel, 0);
assert.equal(migratedNounSave.activeAdjectiveId, null);
assert.equal(migratedNounSave.thousandMeaningMilestoneGranted, false);
assert.equal(migratedNounSave.stats.manualStamps, 0);
nearlyEqual(migratedNounSave.stats.meaningEarnedFromTapping, 0);

const hugeMeaningState = {
  ...defaultState,
  meaning: toDecimal('1e1000'),
  passiveMeaningPerSecond: toDecimal('2.5e500'),
  totalMeaningEarned: toDecimal('3e1000'),
};
const serializedHugeMeaningState = serializeGameState(hugeMeaningState);
assert.notEqual(parseSavedGameState(serializedHugeMeaningState), null);
assert.equal(typeof serializedHugeMeaningState.meaning, 'string');
assert.equal(typeof serializedHugeMeaningState.passiveMeaningPerSecond, 'string');
assert.equal(typeof serializedHugeMeaningState.totalMeaningEarned, 'string');
assert.equal(typeof serializedHugeMeaningState.stats?.meaningEarnedFromTapping, 'string');
const loadedHugeMeaningState = mergeSavedState(serializedHugeMeaningState);
assert.equal(eq(loadedHugeMeaningState.meaning, '1e1000'), true);
assert.equal(eq(loadedHugeMeaningState.passiveMeaningPerSecond, '2.5e500'), true);
assert.equal(eq(loadedHugeMeaningState.totalMeaningEarned, '3e1000'), true);

const savedStatsState = {
  ...hugeMeaningState,
  stats: {
    ...eventGlobalStats,
    meaningEarnedFromTapping: toDecimal('1e500'),
    totalPlayTimeMs: 123456,
  },
};
const loadedStatsState = mergeSavedState(serializeGameState(savedStatsState));
assert.equal(eq(loadedStatsState.stats.meaningEarnedFromTapping, '1e500'), true);
nearlyEqual(loadedStatsState.stats.meaningEarnedFromPassive, 1.25);
assert.equal(loadedStatsState.stats.eventsClaimed, 1);
assert.equal(loadedStatsState.stats.totalPlayTimeMs, 123456);
nearlyEqual(mergeGlobalStats({ meaningEarnedFromTapping: 'not-a-number' }).meaningEarnedFromTapping, 0);

assert.equal(eq(add('1e1000', '2e1000'), '3e1000'), true);
assert.equal(gte(toDecimal('1e1000'), getUpgradeCost(1000)), true);
assert.equal(gte(toDecimal(0.5), getUpgradeCost(0)), false);
assert.equal(formatMeaning(999.99), '999.99');
assert.equal(formatMeaning(1234), '1.23K');
assert.equal(formatMeaning(1.23e6), '1.23M');
assert.equal(formatMeaning('1.23e9'), '1.23e9');
assert.equal(formatRate(0.005), '0.005');
assert.equal(formatMeaning(getUpgradeCost(0)), '1.00');
assert.equal(PERCENTAGE_UPGRADE_UNLOCK_MEANING, 1000);
assert.equal(isPercentageUpgradeUnlocked(999.99), false);
assert.equal(isPercentageUpgradeUnlocked(1000), true);
nearlyEqual(getPercentageUpgradeCost(0), 1000);
nearlyEqual(getPercentageUpgradeCost(1), 1150);
nearlyEqual(getPercentageUpgradeCost(2), 1322.5);
nearlyEqual(getPercentageUpgradeMultiplier(0), 1);
nearlyEqual(getPercentageUpgradeMultiplier(1), 1.05);
nearlyEqual(getPercentageUpgradeMultiplier(4), 1.2);
nearlyEqual(applyStampForce(10, 1), 10.5);
nearlyEqual(applyStampForce(10, 4), 12);
nearlyEqual(applyFilingDepth(10, 1), 10.5);
nearlyEqual(applyFilingDepth(10, 4), 12);
assert.equal(eq(applyStampForce('1e1000', 1), '1.05e1000'), true);
assert.equal(eq(applyFilingDepth('1e1000', 4), '1.2e1000'), true);

const percentageUpgradeSave = mergeSavedState(serializeGameState({
  ...defaultState,
  stampForceLevel: 3,
  filingDepthLevel: 2,
}));
assert.equal(percentageUpgradeSave.stampForceLevel, 3);
assert.equal(percentageUpgradeSave.filingDepthLevel, 2);

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
nearlyEqual(dreamSave.totalMeaningEarned, 150);

assert.equal(canTriggerDreamUnlock(99.99, world, understand, false), false);
assert.equal(canTriggerDreamUnlock(100, world, understand, false), true);
assert.equal(canTriggerDreamUnlock(100, seed, understand, false), false);
assert.equal(canTriggerDreamUnlock(100, world, null, false), false);
assert.equal(canTriggerDreamUnlock(100, world, understand, true), false);

const unlockedTwoSlotBoard = unlockWorkbenchSlotsForProgress(createDefaultWorkbenchBoard(), 100);
assert.deepEqual(unlockedTwoSlotBoard.unlockedSlots, [0, 1]);
assert.equal(WORKBENCH_GRID_COLUMNS, 3);
assert.equal(WORKBENCH_GRID_ROWS, 2);
assert.equal(WORKBENCH_SLOT_COUNT, 6);
assert.equal(isWorkbenchGridSlot(5), true);
assert.equal(isWorkbenchGridSlot(6), false);
assert.equal(getNearestWorkbenchSlot(99, 99), 5);
assert.equal(getAndTokenId(1), 'and:1');
assert.equal(getAndTokenId(2), 'and:2');
assert.equal(isWorkbenchTokenId('and:1'), true);
assert.equal(isWorkbenchTokenId('and:0'), false);
assert.equal(isWorkbenchTokenId('not-a-word'), false);
assert.equal(unlockWorkbenchSlotsForProgress(createDefaultWorkbenchBoard(), 99).unlockedSlots.includes(1), false);
assert.deepEqual(unlockWorkbenchSlotsForProgress(createDefaultWorkbenchBoard(), 499).unlockedSlots, [0, 1]);
assert.deepEqual(unlockWorkbenchSlotsForProgress(createDefaultWorkbenchBoard(), 500).unlockedSlots, [0, 1, 2]);
assert.equal(THIRD_WORKBENCH_SLOT, 2);

const connectorReadyBoard = unlockWorkbenchSlotsForProgress(createDefaultWorkbenchBoard(), 500);
assert.equal(placeAdditionalNoun(connectorReadyBoard, 'rain').placed, false);
const firstAndPlacement = placeOwnedAndConnector(connectorReadyBoard, 1);
assert.equal(firstAndPlacement.placed, true);
assert.equal(firstAndPlacement.board.placements['and:1'], 1);
const connectedRainPlacement = placeAdditionalNoun(firstAndPlacement.board, 'rain');
assert.equal(connectedRainPlacement.placed, true);
assert.equal(connectedRainPlacement.board.placements.rain, 2);
const parsedWorldAndRain = parseWorkbenchSentence(connectedRainPlacement.board, 'world');
assert.deepEqual(parsedWorldAndRain.orderedWordIds, ['world', 'and', 'rain']);
assert.deepEqual(parsedWorldAndRain.nounClauses, [
  { nounId: 'world', effectiveVerbId: null, effectiveAdjectiveId: null },
  { nounId: 'rain', effectiveVerbId: null, effectiveAdjectiveId: null },
]);
assert.equal(parsedWorldAndRain.activeConnectorCount, 1);
assert.deepEqual(parsedWorldAndRain.activeTokenIds, ['world', 'and:1', 'rain']);
assert.deepEqual(parsedWorldAndRain.looseTokenIds, []);
nearlyEqual(getActiveAndProductionMultiplier(1), 1.1);
nearlyEqual(getSentenceTapGain(parsedWorldAndRain, 0), (0.01 + 0.005 + 0.3) * 1.1);
nearlyEqual(getSentencePassiveGain(parsedWorldAndRain, 0, 0, 0), (0 + (0.006 * 1.25) + 0.3) * 1.1);
nearlyEqual(getSentenceFilingUpgradeBonus(parsedWorldAndRain, 10), 0.042);
nearlyEqual(getSentenceFilingUpgradeCost(parsedWorldAndRain, 0), 1);

const worldAndSoilBoard: WorkbenchBoard = {
  unlockedSlots: [0, 1, 2],
  placements: { world: 0, 'and:1': 1, soil: 2 },
};
const parsedWorldAndSoil = parseWorkbenchSentence(worldAndSoilBoard, 'world');
nearlyEqual(getSentenceStampUpgradeCost(parsedWorldAndSoil, 0), 0.95);
nearlyEqual(getSentenceStampUpgradeCost(parsedWorldAndSoil, 0, 0.75), 0.7125);

const worldAndSeedBoard: WorkbenchBoard = {
  unlockedSlots: [0, 1, 2],
  placements: { world: 0, 'and:1': 1, seed: 2 },
};
const parsedWorldAndSeed = parseWorkbenchSentence(worldAndSeedBoard, 'world');
nearlyEqual(getSentenceStampUpgradeBonus(parsedWorldAndSeed, 10), 0.042);

const worldAndSlumberBoard: WorkbenchBoard = {
  unlockedSlots: [0, 1, 2],
  placements: { world: 0, 'and:1': 1, slumber: 2 },
};
nearlyEqual(getSentenceEventSpawnMultiplier(parseWorkbenchSentence(worldAndSlumberBoard, 'world')), 1.3);

const looseSlumberBoard: WorkbenchBoard = {
  unlockedSlots: [0, 1],
  placements: { world: 0, slumber: 1 },
};
nearlyEqual(getSentenceEventSpawnMultiplier(parseWorkbenchSentence(looseSlumberBoard, 'world')), 1);

const worldAndUnderstandSlumberBoard: WorkbenchBoard = {
  unlockedSlots: [0, 1, 2, 3],
  placements: { world: 0, 'and:1': 1, understand: 2, slumber: 3 },
};
nearlyEqual(
  getSentenceEventSpawnMultiplier(parseWorkbenchSentence(worldAndUnderstandSlumberBoard, 'world')),
  1.6,
);

const worldAndUnderstandStreamBoard: WorkbenchBoard = {
  unlockedSlots: [0, 1, 2, 3],
  placements: { world: 0, 'and:1': 1, understand: 2, stream: 3 },
};
const secondaryStreamClause = getActiveStreamClause(parseWorkbenchSentence(worldAndUnderstandStreamBoard, 'world'));
assert.equal(secondaryStreamClause?.noun.id, 'stream');
assert.equal(secondaryStreamClause?.verb?.id, 'understand');
const secondaryStreamProduction = getSentenceClauseProduction(
  parseWorkbenchSentence(worldAndUnderstandStreamBoard, 'world'),
  0,
  0,
  0,
  0,
  1,
);
nearlyEqual(secondaryStreamProduction[1].tapGain, 0.01);
nearlyEqual(secondaryStreamProduction[1].passiveGain, 0.02);

const parsedTrailingAnd = parseWorkbenchSentence(firstAndPlacement.board, 'world');
assert.equal(parsedTrailingAnd.activeConnectorCount, 0);
assert.deepEqual(parsedTrailingAnd.activeTokenIds, ['world']);
assert.deepEqual(parsedTrailingAnd.looseTokenIds, ['and:1']);
nearlyEqual(getSentenceTapGain(parsedTrailingAnd, 0), 0.01);

const understandWorldAndRainBoard: WorkbenchBoard = {
  unlockedSlots: [0, 1, 2, 3],
  placements: {
    understand: 0,
    world: 1,
    'and:1': 2,
    rain: 3,
  },
};
const parsedUnderstandWorldAndRain = parseWorkbenchSentence(understandWorldAndRainBoard, 'world');
assert.deepEqual(parsedUnderstandWorldAndRain.nounClauses, [
  { nounId: 'world', effectiveVerbId: 'understand', effectiveAdjectiveId: null },
  { nounId: 'rain', effectiveVerbId: null, effectiveAdjectiveId: null },
]);
assert.deepEqual(parsedUnderstandWorldAndRain.modifierLinks, [
  { modifierWordId: 'understand', targetNounId: 'world', kind: 'verb' },
]);
assert.deepEqual(getWordConnectionDisplay(parsedUnderstandWorldAndRain.modifierLinks, 'understand'), {
  color: '#9a6a36',
  label: '→ World',
});
assert.deepEqual(getWordConnectionDisplay(parsedUnderstandWorldAndRain.modifierLinks, 'world'), {
  color: '#9a6a36',
  label: '← Understand',
});
assert.equal(getWordConnectionDisplay(parsedUnderstandWorldAndRain.modifierLinks, 'rain'), null);
nearlyEqual(getSentenceTapGain(parsedUnderstandWorldAndRain, 0), (0.02 + 0.005 + 0.3) * 1.1);
const understandWorldAndRainProduction = getSentenceClauseProduction(
  parsedUnderstandWorldAndRain,
  0,
  0,
  0,
  0,
  1,
);
nearlyEqual(understandWorldAndRainProduction[0].tapGain, 0.02);
nearlyEqual(understandWorldAndRainProduction[1].tapGain, 0.005);
nearlyEqual(understandWorldAndRainProduction[1].passiveGain, 0.006 * 1.25);

const growWorldBoard: WorkbenchBoard = {
  unlockedSlots: [0, 1],
  placements: { grow: 0, world: 1 },
};
const parsedGrowWorld = parseWorkbenchSentence(growWorldBoard, 'world');
assert.equal(hasActiveSentenceVerb(parsedGrowWorld, 'grow'), true);
nearlyEqual(GROW_CURRENT_MEANING_PERCENT, 0.005);
nearlyEqual(getGrowClauseTapBonus(grow, 100), 0.5);
assert.equal(eq(getGrowClauseTapBonus(grow, '1e1000'), '5e997'), true);
nearlyEqual(getSentenceTapGain(parsedGrowWorld, 0, 1, 100), 0.51);

const worldGrowBoard: WorkbenchBoard = {
  unlockedSlots: [0, 1],
  placements: { world: 0, grow: 1 },
};
const parsedWorldGrow = parseWorkbenchSentence(worldGrowBoard, 'world');
assert.equal(hasActiveSentenceVerb(parsedWorldGrow, 'grow'), false);
nearlyEqual(getSentenceTapGain(parsedWorldGrow, 0, 1, 100), 0.01);

const flowWaterBoard: WorkbenchBoard = {
  unlockedSlots: [0, 1],
  placements: { flow: 0, water: 1 },
};
const parsedFlowWater = parseWorkbenchSentence(flowWaterBoard, 'water');
assert.equal(hasActiveSentenceVerb(parsedFlowWater, 'flow'), true);
assert.equal(FLOW_TRIGGER_INTERVAL_SECONDS, 300);
assert.equal(FLOW_SURGE_DURATION_SECONDS, 30);
nearlyEqual(FLOW_SURGE_PRODUCTION_MULTIPLIER, 1.5);
nearlyEqual(getFlowSurgeMultiplier(parsedFlowWater, null, 0), 1);
nearlyEqual(getFlowSurgeMultiplier(parsedFlowWater, 30_000, 0), 1.5);
nearlyEqual(getFlowSurgeMultiplier(parsedFlowWater, 30_000, 30_000), 1);

const waterFlowBoard: WorkbenchBoard = {
  unlockedSlots: [0, 1],
  placements: { water: 0, flow: 1 },
};
nearlyEqual(getFlowSurgeMultiplier(parseWorkbenchSentence(waterFlowBoard, 'water'), 30_000, 0), 1);

const understandAndRainBoard: WorkbenchBoard = {
  unlockedSlots: [0, 1, 2],
  placements: { understand: 0, 'and:1': 1, rain: 2 },
};
const parsedUnderstandAndRain = parseWorkbenchSentence(understandAndRainBoard, 'rain');
assert.deepEqual(parsedUnderstandAndRain.modifierLinks, []);
assert.deepEqual(parsedUnderstandAndRain.activeTokenIds, ['rain']);
assert.deepEqual(parsedUnderstandAndRain.looseTokenIds, ['understand', 'and:1']);
assert.equal(getModifierConnectionColor('understand'), '#9a6a36');
assert.equal(getModifierConnectionColor('grow'), '#4f7a42');
assert.equal(getModifierConnectionColor('flow'), '#277c91');

const repeatedConnectorBoard: WorkbenchBoard = {
  unlockedSlots: [0, 1, 2, 3, 4],
  placements: connectedRainPlacement.board.placements,
};
const secondAndPlacement = placeOwnedAndConnector(repeatedConnectorBoard, 2);
assert.equal(secondAndPlacement.placed, true);
assert.equal(secondAndPlacement.board.placements['and:2'], 3);

const lockedMove = moveWorkbenchWordToSlot(createDefaultWorkbenchBoard(), 'world', 1);
assert.equal(lockedMove.moved, false);
assert.equal(lockedMove.board.placements.world, 0);

const extendedWordIdSave = serializeGameState({
  ...defaultState,
  meaning: toDecimal(2000),
  activeNounId: 'oak',
  activeWordId: 'oak',
  unlockedWordIds: ['world', 'and', 'oak', 'lake'],
  twoHundredFiftyMeaningMilestoneGranted: true,
});
const legacyExtendedWordIdSave: Partial<typeof extendedWordIdSave> = { ...extendedWordIdSave };
delete legacyExtendedWordIdSave.andOwnedCount;
assert.notEqual(parseSavedGameState(legacyExtendedWordIdSave), null);
const loadedExtendedWordIdSave = mergeSavedState(parseSavedGameState(legacyExtendedWordIdSave));
assert.ok(loadedExtendedWordIdSave.unlockedWordIds.includes('and'));
assert.equal(loadedExtendedWordIdSave.andOwnedCount, 1);
assert.ok(loadedExtendedWordIdSave.unlockedWordIds.includes('oak'));
assert.ok(loadedExtendedWordIdSave.unlockedWordIds.includes('lake'));
assert.equal(loadedExtendedWordIdSave.twoHundredFiftyMeaningMilestoneGranted, true);

const adjectiveSave = serializeGameState({
  ...defaultState,
  meaning: toDecimal(1000),
  unlockedWordIds: ['world', 'heavy', 'still'],
  activeAdjectiveId: 'heavy',
  thousandMeaningMilestoneGranted: true,
  workbenchBoard: {
    unlockedSlots: [0, 1, 2],
    placements: {
      heavy: 0,
      world: 1,
    },
  },
});
assert.notEqual(parseSavedGameState(adjectiveSave), null);
const loadedAdjectiveSave = mergeSavedState(adjectiveSave);
assert.equal(loadedAdjectiveSave.activeAdjectiveId, 'heavy');
assert.ok(loadedAdjectiveSave.unlockedWordIds.includes('still'));
assert.equal(loadedAdjectiveSave.thousandMeaningMilestoneGranted, true);

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

const stateBeforeDream = {
  ...defaultState,
  meaning: toDecimal(125),
  chosenFirstPath: 'farm',
  stampUpgradeLevel: 4,
  filingUpgradeLevel: 3,
  workbenchBoard: understandWorldBoard,
} as GameState;
const stateAfterDream = unlockDreamLayer(stateBeforeDream);
assert.equal(stateBeforeDream.dreamUnlocked, false);
assert.equal(stateAfterDream.dreamUnlocked, true);
assert.equal(stateAfterDream.chosenFirstPath, 'farm');
nearlyEqual(stateAfterDream.meaning, 125);
assert.equal(stateAfterDream.stampUpgradeLevel, 4);
assert.equal(stateAfterDream.filingUpgradeLevel, 3);
assert.equal(stateAfterDream.workbenchBoard, stateBeforeDream.workbenchBoard);
assert.equal(getUnlockedWords(stateAfterDream.unlockedWordIds).some((word) => word.id === 'slumber'), true);
assert.deepEqual(getAvailableEventTypes(getWordById('farm'), true), ['farm']);
assert.deepEqual(getAvailableEventTypes(water, true), ['water']);
assert.deepEqual(getAvailableEventTypes(slumber, true), ['dream-facedown-truth']);
assert.deepEqual(getAvailableEventTypes(slumber, false), []);
assert.deepEqual(getAvailableEventTypes(world, true), []);
assert.equal(getRandomVisibleEventType(getWordById('farm'), true), 'farm');
assert.equal(getRandomVisibleEventType(water, true), 'water');
assert.equal(getRandomVisibleEventType(slumber, true), 'dream-facedown-truth');

const facedownTruthVisibleEvent = createVisiblePathEvent('dream-facedown-truth');
assert.equal(facedownTruthVisibleEvent.name, 'Facedown Truth');
assert.equal(facedownTruthVisibleEvent.prompt, 'Choose one card');
assert.deepEqual(FACEDOWN_TRUTH_REWARDS, [
  { multiplier: 2, probability: 0.6 },
  { multiplier: 5, probability: 0.3 },
  { multiplier: 10, probability: 0.1 },
]);
assert.equal(selectFacedownTruthMultiplier(0), 2);
assert.equal(selectFacedownTruthMultiplier(0.599999), 2);
assert.equal(selectFacedownTruthMultiplier(0.6), 5);
assert.equal(selectFacedownTruthMultiplier(0.899999), 5);
assert.equal(selectFacedownTruthMultiplier(0.9), 10);
assert.equal(selectFacedownTruthMultiplier(1), 10);
assert.equal(FACEDOWN_TRUTH_DURATION_SECONDS, 10);

const facedownStart = Date.now();
const facedownTruthActiveEvent = createFacedownTruthActiveEvent(facedownTruthVisibleEvent, 0.95);
assert.equal(facedownTruthActiveEvent.type, 'dream-facedown-truth');
assert.equal(facedownTruthActiveEvent.productionMultiplier, 10);
assert.ok(facedownTruthActiveEvent.endsAt >= facedownStart + 10000);
assert.ok(facedownTruthActiveEvent.endsAt <= Date.now() + 10000);
assert.equal(getFacedownTruthProductionMultiplier(facedownTruthActiveEvent), 10);
assert.equal(getFacedownTruthProductionMultiplier(null), 1);
assert.equal(getFacedownTruthProductionMultiplier({
  ...facedownTruthActiveEvent,
  endsAt: Date.now() - 1,
}), 1);
nearlyEqual(
  mul(getTapGain(world, 0), getFacedownTruthProductionMultiplier(facedownTruthActiveEvent)),
  0.1,
);
nearlyEqual(
  mul(getPassiveGain(water, 0, 0, 0), getFacedownTruthProductionMultiplier(facedownTruthActiveEvent)),
  0.0375,
);

const wheelVisibleEvent = createVisiblePathEvent('dream-wheel-of-meaning');
assert.equal(wheelVisibleEvent.name, 'Wheel of Meaning');
assert.equal(wheelVisibleEvent.prompt, 'Spin the wheel');
assert.deepEqual(WHEEL_OF_MEANING_REWARDS.map((reward) => reward.probability), [0.4, 0.25, 0.15, 0.1, 0.07, 0.03]);
nearlyEqual(WHEEL_OF_MEANING_REWARDS.reduce((total, reward) => total + reward.probability, 0), 1);
assert.equal(selectWheelOfMeaningReward(0).id, 'production-15');
assert.equal(selectWheelOfMeaningReward(0.399999).id, 'production-15');
assert.equal(selectWheelOfMeaningReward(0.4).id, 'production-30');
assert.equal(selectWheelOfMeaningReward(0.65).id, 'production-x2');
assert.equal(selectWheelOfMeaningReward(0.8).id, 'meaning-x2');
assert.equal(selectWheelOfMeaningReward(0.9).id, 'nothing');
assert.equal(selectWheelOfMeaningReward(0.97).id, 'jackpot');

const wheelProduction15 = WHEEL_OF_MEANING_REWARDS[0];
const wheelProduction30 = WHEEL_OF_MEANING_REWARDS[1];
const wheelTimedReward = WHEEL_OF_MEANING_REWARDS[2];
const wheelMeaningReward = WHEEL_OF_MEANING_REWARDS[3];
const wheelNothingReward = WHEEL_OF_MEANING_REWARDS[4];
const wheelJackpotReward = WHEEL_OF_MEANING_REWARDS[5];
nearlyEqual(getWheelInstantMeaningGain(wheelProduction15, 100, 3), 45);
nearlyEqual(getWheelInstantMeaningGain(wheelProduction30, 100, 3), 90);
nearlyEqual(getWheelInstantMeaningGain(wheelMeaningReward, 100, 3), 200);
nearlyEqual(getWheelInstantMeaningGain(wheelNothingReward, 100, 3), 0);
nearlyEqual(getWheelInstantMeaningGain(wheelTimedReward, 100, 3), 0);
nearlyEqual(getWheelInstantMeaningGain(wheelJackpotReward, 100, 3), 900);
assert.equal(eq(getWheelInstantMeaningGain(wheelJackpotReward, 0, '1e1000'), '3e1002'), true);

assert.equal(WHEEL_TIMED_MULTIPLIER_DURATION_SECONDS, 10);
const wheelActiveStart = Date.now();
const wheelTimedActiveEvent = createWheelTimedActiveEvent(wheelVisibleEvent, wheelTimedReward);
assert.notEqual(wheelTimedActiveEvent, null);
assert.equal(wheelTimedActiveEvent?.productionMultiplier, 2);
assert.ok((wheelTimedActiveEvent?.endsAt ?? 0) >= wheelActiveStart + 10000);
assert.ok((wheelTimedActiveEvent?.endsAt ?? 0) <= Date.now() + 10000);
assert.equal(getDreamProductionMultiplier(wheelTimedActiveEvent), 2);
nearlyEqual(mul(getTapGain(world, 0), getDreamProductionMultiplier(wheelTimedActiveEvent)), 0.02);
nearlyEqual(mul(getPassiveGain(water, 0, 0, 0), getDreamProductionMultiplier(wheelTimedActiveEvent)), 0.0075);

const wheelStats = recordEventClaim(createDefaultGlobalStats(), 'dream-wheel-of-meaning', 45);
assert.equal(wheelStats.eventsClaimed, 1);
assert.equal(wheelStats.eventClaims['dream-wheel-of-meaning'], 1);
nearlyEqual(wheelStats.meaningEarnedFromEvents, 45);

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

const heavyRootBoard = {
  unlockedSlots: [0, 1, 2],
  placements: {
    heavy: 0,
    root: 1,
  },
} as WorkbenchBoard;
const parsedHeavyRoot = parseWorkbenchSentence(heavyRootBoard, 'root');
assert.equal(parsedHeavyRoot.activeNounId, 'root');
assert.equal(parsedHeavyRoot.effectiveAdjectiveId, 'heavy');
assert.equal(parsedHeavyRoot.feedback, 'Heavy modifies Root.');
nearlyEqual(getTapGain(root, 0, null, heavy), 0.15);
nearlyEqual(getTapGain(root, 10, null, heavy), 0.175);

const rootHeavyBoard = {
  unlockedSlots: [0, 1, 2],
  placements: {
    root: 0,
    heavy: 1,
  },
} as WorkbenchBoard;
const parsedRootHeavy = parseWorkbenchSentence(rootHeavyBoard, 'root');
assert.equal(parsedRootHeavy.activeNounId, 'root');
assert.equal(parsedRootHeavy.effectiveAdjectiveId, null);
assert.deepEqual(parsedRootHeavy.activeTokenIds, ['root']);
assert.deepEqual(parsedRootHeavy.looseTokenIds, ['heavy']);
nearlyEqual(getTapGain(root, 0, null, null), 0.1);

const stillRiverBoard = {
  unlockedSlots: [0, 1, 2],
  placements: {
    still: 0,
    river: 1,
  },
} as WorkbenchBoard;
const parsedStillRiver = parseWorkbenchSentence(stillRiverBoard, 'river');
assert.equal(parsedStillRiver.activeNounId, 'river');
assert.equal(parsedStillRiver.effectiveAdjectiveId, 'still');
assert.equal(parsedStillRiver.feedback, 'Still modifies River.');
nearlyEqual(getPassiveGain(river, 0, 0, 0, null, still), 0.0375);

const understandHeavyRootBoard = {
  unlockedSlots: [0, 1, 2],
  placements: {
    understand: 0,
    heavy: 1,
    root: 2,
  },
} as WorkbenchBoard;
const parsedUnderstandHeavyRoot = parseWorkbenchSentence(understandHeavyRootBoard, 'root');
assert.equal(parsedUnderstandHeavyRoot.activeNounId, 'root');
assert.equal(parsedUnderstandHeavyRoot.effectiveVerbId, 'understand');
assert.equal(parsedUnderstandHeavyRoot.effectiveAdjectiveId, 'heavy');
assert.deepEqual(parsedUnderstandHeavyRoot.modifierLinks, [
  { modifierWordId: 'understand', targetNounId: 'root', kind: 'verb' },
  { modifierWordId: 'heavy', targetNounId: 'root', kind: 'adjective' },
]);
assert.deepEqual(parsedUnderstandHeavyRoot.activeTokenIds, ['understand', 'heavy', 'root']);
assert.deepEqual(parsedUnderstandHeavyRoot.looseTokenIds, []);
assert.equal(getWordConnectionDisplay(parsedUnderstandHeavyRoot.modifierLinks, 'root')?.label, '← Understand');
assert.equal(parsedUnderstandHeavyRoot.feedback, 'Heavy modifies Root.');
nearlyEqual(getTapGain(root, 0, understand, heavy), 0.3);
nearlyEqual(getTapGain(river, 0, null, heavy), 0.005);
nearlyEqual(getPassiveGain(root, 0, 0, 0, null, still), 0);

const understandStreamBoard = {
  unlockedSlots: [0, 1],
  placements: {
    understand: 0,
    stream: 1,
  },
} as WorkbenchBoard;
const parsedUnderstandStream = parseWorkbenchSentence(understandStreamBoard, 'stream');
assert.equal(parsedUnderstandStream.activeNounId, 'stream');
assert.equal(parsedUnderstandStream.effectiveVerbId, 'understand');

const streamUnderstandBoard = {
  unlockedSlots: [0, 1],
  placements: {
    stream: 0,
    understand: 1,
  },
} as WorkbenchBoard;
const parsedStreamUnderstand = parseWorkbenchSentence(streamUnderstandBoard, 'stream');
assert.equal(parsedStreamUnderstand.activeNounId, 'stream');
assert.equal(parsedStreamUnderstand.effectiveVerbId, null);

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

const slumberBoardSave = mergeSavedState({
  ...stateAfterDream,
  activeWordId: 'slumber',
  activeNounId: 'slumber',
  activeVerbId: 'understand',
  workbenchBoard: {
    unlockedSlots: [0, 1],
    placements: {
      understand: 0,
      slumber: 1,
    },
  },
} as GameState);
assert.equal(slumberBoardSave.dreamUnlocked, true);
assert.equal(slumberBoardSave.workbenchBoard.placements.understand, 0);
assert.equal(slumberBoardSave.workbenchBoard.placements.slumber, 1);

const seedStampBonus = getEffectiveStampUpgradeBonus(10, seed);
nearlyEqual(seedStampBonus, 0.022);
nearlyEqual(getTapGain(seed, 10), 0.065);
const understoodSeedStampBonus = getEffectiveStampUpgradeBonus(10, seed, understand);
nearlyEqual(understoodSeedStampBonus, 0.024);
nearlyEqual(getTapGain(seed, 10, understand), 0.105);

const rainFilingBonus = getEffectiveFilingUpgradeBonus(10, rain);
nearlyEqual(rainFilingBonus, 0.022);
nearlyEqual(getPassiveGain(rain, 10, 0, 0), 0.035);
const understoodRainFilingBonus = getEffectiveFilingUpgradeBonus(10, rain, understand);
nearlyEqual(understoodRainFilingBonus, 0.024);
nearlyEqual(getPassiveGain(rain, 10, 0, 0, understand), 0.045);

nearlyEqual(getEffectiveStampUpgradeCost(0, soil), 0.95);
nearlyEqual(getEffectiveStampUpgradeCost(0, soil, understand), 0.9);
nearlyEqual(getEffectiveFilingUpgradeCost(0, stream), 1);
nearlyEqual(getEffectiveFilingUpgradeCost(0, stream, understand), 1);
nearlyEqual(getEffectiveStampUpgradeCost(0, soil, understand, 0.75), 0.675);
nearlyEqual(getEffectiveFilingUpgradeCost(0, stream, understand, 0.75), 0.75);
nearlyEqual(applyUpgradeCostFloor(1, 0.01), 0.25);
nearlyEqual(applyUpgradeCostFloor(0.2, 0.01), 0.1);

assert.equal(rain.specialEffectType, 'filing_upgrade_bonus_multiplier');
assert.equal(stream.specialEffectType, 'periodic_passive_burst');
assert.equal(stream.effectDescription, 'Every 8 seconds, gain 3 seconds worth of passive Meaning.');
assert.equal(STREAM_DRIZZLE_INTERVAL_SECONDS, 8);
assert.equal(STREAM_DRIZZLE_PASSIVE_SECONDS, 3);
assert.equal(UNDERSTAND_STREAM_DRIZZLE_PASSIVE_SECONDS, 6);
assert.equal(isStreamDrizzleActive(stream), true);
assert.equal(isStreamDrizzleActive(rain), false);
assert.equal(getStreamDrizzlePassiveSeconds(stream), 3);
assert.equal(getStreamDrizzlePassiveSeconds(stream, understand), 6);
assert.equal(
  getStreamDrizzlePassiveSeconds(stream, parsedStreamUnderstand.effectiveVerbId ? understand : null),
  3,
);
assert.equal(
  getStreamDrizzlePassiveSeconds(stream, parsedUnderstandStream.effectiveVerbId ? understand : null),
  6,
);
nearlyEqual(getStreamDrizzleGain(2.5, stream), 7.5);
nearlyEqual(getStreamDrizzleGain(2.5, stream, understand), 15);
assert.equal(eq(getStreamDrizzleGain('1e1000', stream, understand), '6e1000'), true);
nearlyEqual(getStreamDrizzleGain(2.5, rain), 0);

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
assert.equal(RIVER_PASSIVE_GROWTH_CAP, 2);
nearlyEqual(getRiverPassiveIncrease(river, 0, 90000), 0.015);
nearlyEqual(getRiverPassiveIncrease(river, 0, 90000, understand), 0.03);
nearlyEqual(getRiverPassiveIncrease(river, 0, 300 * 60000), 2);
nearlyEqual(getRiverPassiveIncrease(river, 0, 300 * 60000, understand), 2);
nearlyEqual(getActiveWordPassiveMultiplier(river, 0, 300 * 60000), 3);
nearlyEqual(getActiveWordPassiveMultiplier(river, 0, 300 * 60000, understand), 3);
assert.equal(
  getActiveWordPowerLabel(river, null, 0, 90000),
  'Passive +1.5% (+1%/min, cap +200%)',
);
assert.equal(
  getActiveWordPowerLabel(river, understand, 0, 300 * 60000),
  'Passive +200% (+2%/min, cap +200%)',
);

const clearCurrentEvent = {
  type: 'water',
  name: 'Clear Current',
  endsAt: Date.now() + 1000,
} as const;

nearlyEqual(getFlowEventIdleMultiplier(clearCurrentEvent, 0), 1.1);
nearlyEqual(getFlowEventIdleMultiplier(clearCurrentEvent, 50), 1.5);
nearlyEqual(getFlowEventIdleMultiplier(clearCurrentEvent, 100), 2);
nearlyEqual(getFlowEventIdleMultiplier(clearCurrentEvent, 150), 2);

const harvestWindowEvent = {
  type: 'farm',
  name: 'Harvest Window',
  endsAt: Date.now() + 1000,
} as const;
nearlyEqual(getFarmEventTapMultiplier(harvestWindowEvent), 2);

const softenedRulesEvent = {
  type: 'dream-softened-rules',
  name: 'Softened Rules',
  endsAt: Date.now() + 1000,
} as const;

nearlyEqual(getSoftenedRulesUpgradeCostMultiplier(null), 1);
nearlyEqual(getSoftenedRulesUpgradeCostMultiplier(softenedRulesEvent), 0.75);
nearlyEqual(getMeaningBloomGain(1000, 1), 100);
nearlyEqual(getMeaningBloomGain(10, 2), 20);
assert.equal(eq(getMeaningBloomGain('1e1000', 1), '1e999'), true);

for (const value of [
  getTapGain(world, 0),
  getPassiveGain(water, 0, 0, 0),
  getUpgradeCost(1000),
  getMeaningBloomGain(1000, 1),
]) {
  assert.equal(Number.isFinite(value.m), true);
  assert.equal(Number.isFinite(value.e), true);
}

const originalRandom = Math.random;
try {
  Math.random = () => 0;
  nearlyEqual(getNextPathEventDelayMs(10), 90000);
} finally {
  Math.random = originalRandom;
}

console.log('game logic tests passed');
