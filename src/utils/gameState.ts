import { getWordById } from '../data/words.ts';
import type { GameState, SerializedGameState, WordId, WorkbenchCardPosition, WorkbenchLayout } from '../types/game';
import { max, toDecimal } from './bigNumber.ts';
import { createDefaultGlobalStats, mergeGlobalStats } from './stats.ts';
import {
  createDefaultWorkbenchBoard,
  migrateActiveWordsToWorkbenchBoard,
  unlockWorkbenchSlotsForProgress,
} from './workbench.ts';

export const DEFAULT_WORKBENCH_LAYOUT: WorkbenchLayout = {
  noun: { xPercent: 7, yPercent: 14 },
  verb: { xPercent: 47, yPercent: 14 },
};

function migrateStarterWordId(wordId: WordId | null | undefined): WordId | null {
  return wordId === 'apple' ? 'world' : wordId ?? null;
}

function mergeWorkbenchPosition(
  savedPosition: WorkbenchCardPosition | undefined,
  defaultPosition: WorkbenchCardPosition,
): WorkbenchCardPosition {
  if (
    !savedPosition ||
    typeof savedPosition.xPercent !== 'number' ||
    typeof savedPosition.yPercent !== 'number'
  ) {
    return defaultPosition;
  }

  return {
    xPercent: Math.max(0, Math.min(100, savedPosition.xPercent)),
    yPercent: Math.max(0, Math.min(100, savedPosition.yPercent)),
  };
}

export function mergeWorkbenchLayout(savedLayout: WorkbenchLayout | undefined): WorkbenchLayout {
  return {
    noun: mergeWorkbenchPosition(savedLayout?.noun, DEFAULT_WORKBENCH_LAYOUT.noun),
    verb: mergeWorkbenchPosition(savedLayout?.verb, DEFAULT_WORKBENCH_LAYOUT.verb),
  };
}

export function createDefaultState(): GameState {
  const now = Date.now();

  return {
    meaning: toDecimal(0),
    activeNounId: 'world',
    activeVerbId: null,
    activeWordId: 'world',
    unlockedWordIds: ['world'],
    chosenFirstPath: null,
    passiveMeaningPerSecond: toDecimal(0),
    tenMeaningMilestoneGranted: false,
    twentyFiveMeaningMilestoneGranted: false,
    fiftyMeaningMilestoneGranted: false,
    hundredMeaningMilestoneGranted: false,
    manualStampCount: 0,
    activeWordStartedAt: now,
    stampUpgradeLevel: 0,
    filingUpgradeLevel: 0,
    workbenchLayout: DEFAULT_WORKBENCH_LAYOUT,
    workbenchBoard: createDefaultWorkbenchBoard(),
    dreamUnlocked: false,
    totalMeaningEarned: toDecimal(0),
    stats: createDefaultGlobalStats(),
    lastSavedAt: null,
  };
}

export function mergeSavedState(saved: GameState | SerializedGameState | null): GameState {
  const defaultState = createDefaultState();

  if (!saved) {
    return defaultState;
  }

  const savedMeaning = max(toDecimal(saved.meaning), 0);
  const savedPassiveMeaningPerSecond = max(toDecimal(saved.passiveMeaningPerSecond), 0);
  const savedTotalMeaningEarned = max(
    max(toDecimal(saved.totalMeaningEarned ?? saved.meaning), savedMeaning),
    0,
  );

  const savedUnlockedWordIds = Array.from(new Set<WordId>([
    'world',
    ...saved.unlockedWordIds.map((wordId) => migrateStarterWordId(wordId) ?? 'world'),
  ])).filter((wordId) => wordId !== 'apple');
  const shouldMigrateUnderstand =
    savedUnlockedWordIds.includes('grow') ||
    savedUnlockedWordIds.includes('flow') ||
    savedUnlockedWordIds.includes('understand');
  const dreamUnlocked = saved.dreamUnlocked ?? saved.unlockedWordIds.includes('slumber');
  const unlockedWordIds = Array.from(new Set<WordId>([
    ...savedUnlockedWordIds,
    ...(shouldMigrateUnderstand ? (['understand'] as WordId[]) : []),
    ...(dreamUnlocked ? (['slumber'] as WordId[]) : []),
  ]));
  const migratedActiveWordId = migrateStarterWordId(saved.activeWordId) ?? 'world';
  const savedActiveWord = getWordById(migratedActiveWordId);
  const migratedSavedActiveNounId = migrateStarterWordId(saved.activeNounId);
  const migratedSavedActiveVerbId = migrateStarterWordId(saved.activeVerbId);
  const activeNounIdFromSave = migratedSavedActiveNounId ?? (savedActiveWord.type === 'noun' ? migratedActiveWordId : 'world');
  const activeVerbIdFromSave = migratedSavedActiveVerbId ?? (savedActiveWord.type === 'verb' ? migratedActiveWordId : null);
  const activeNounId = unlockedWordIds.includes(activeNounIdFromSave) && getWordById(activeNounIdFromSave).type === 'noun'
    ? activeNounIdFromSave
    : 'world';
  const activeVerbId =
    activeVerbIdFromSave && unlockedWordIds.includes(activeVerbIdFromSave) && getWordById(activeVerbIdFromSave).type === 'verb'
      ? activeVerbIdFromSave
      : null;

  const workbenchBoard = unlockWorkbenchSlotsForProgress(
    migrateActiveWordsToWorkbenchBoard(
      activeVerbId
        ? {
            ...(saved.workbenchBoard ?? createDefaultWorkbenchBoard()),
            unlockedSlots: Array.from(new Set([
              ...((saved.workbenchBoard ?? createDefaultWorkbenchBoard()).unlockedSlots),
              1,
            ])),
          }
        : saved.workbenchBoard,
      activeNounId,
      activeVerbId,
    ),
    savedMeaning,
  );

  return {
    ...defaultState,
    ...saved,
    meaning: savedMeaning,
    activeNounId,
    activeVerbId,
    activeWordId: activeNounId,
    unlockedWordIds,
    passiveMeaningPerSecond: savedPassiveMeaningPerSecond,
    tenMeaningMilestoneGranted:
      saved.tenMeaningMilestoneGranted ??
      (
        saved.unlockedWordIds.includes('seed') ||
        saved.unlockedWordIds.includes('rain') ||
        saved.unlockedWordIds.includes('soil') ||
        saved.unlockedWordIds.includes('stream') ||
        saved.unlockedWordIds.includes('root') ||
        saved.unlockedWordIds.includes('river') ||
        saved.unlockedWordIds.includes('grow') ||
        saved.unlockedWordIds.includes('flow') ||
        saved.unlockedWordIds.includes('understand')
      ),
    twentyFiveMeaningMilestoneGranted:
      saved.twentyFiveMeaningMilestoneGranted ??
      (
        saved.unlockedWordIds.includes('soil') ||
        saved.unlockedWordIds.includes('stream') ||
        saved.unlockedWordIds.includes('root') ||
        saved.unlockedWordIds.includes('river') ||
        saved.unlockedWordIds.includes('grow') ||
        saved.unlockedWordIds.includes('flow') ||
        saved.unlockedWordIds.includes('understand')
      ),
    fiftyMeaningMilestoneGranted:
      saved.fiftyMeaningMilestoneGranted ??
      (
        saved.unlockedWordIds.includes('root') ||
        saved.unlockedWordIds.includes('river') ||
        saved.unlockedWordIds.includes('grow') ||
        saved.unlockedWordIds.includes('flow') ||
        saved.unlockedWordIds.includes('understand')
      ),
    hundredMeaningMilestoneGranted:
      saved.hundredMeaningMilestoneGranted ??
      (
        saved.unlockedWordIds.includes('grow') ||
        saved.unlockedWordIds.includes('flow') ||
        saved.unlockedWordIds.includes('understand')
      ),
    manualStampCount: Math.max(0, saved.manualStampCount ?? 0),
    activeWordStartedAt: saved.activeWordStartedAt ?? Date.now(),
    stampUpgradeLevel: Math.max(0, saved.stampUpgradeLevel ?? 0),
    filingUpgradeLevel: Math.max(0, saved.filingUpgradeLevel ?? 0),
    workbenchLayout: mergeWorkbenchLayout(saved.workbenchLayout),
    workbenchBoard,
    dreamUnlocked,
    totalMeaningEarned: savedTotalMeaningEarned,
    stats: mergeGlobalStats(saved.stats),
  };
}
