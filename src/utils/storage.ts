import type { GameState, SerializedGameState, WordId } from '../types/game';
import { serializeBigNumber, toDecimal } from './bigNumber.ts';
import { serializeGlobalStats } from './stats.ts';

const STORAGE_KEY = 'approved-text-save-v4';
const OLD_STORAGE_KEYS = ['approved-text-save-v1', 'approved-text-save-v2', 'approved-text-save-v3'];

function isWordId(value: unknown): value is WordId {
  return (
    value === 'apple' ||
    value === 'world' ||
    value === 'understand' ||
    value === 'farm' ||
    value === 'seed' ||
    value === 'soil' ||
    value === 'root' ||
    value === 'grow' ||
    value === 'harvest' ||
    value === 'orchard' ||
    value === 'oak' ||
    value === 'plow' ||
    value === 'fertile' ||
    value === 'season' ||
    value === 'water' ||
    value === 'rain' ||
    value === 'stream' ||
    value === 'river' ||
    value === 'flow' ||
    value === 'ice' ||
    value === 'pour' ||
    value === 'reservoir' ||
    value === 'tide' ||
    value === 'lake' ||
    value === 'current' ||
    value === 'flood' ||
    value === 'ocean' ||
    value === 'dream' ||
    value === 'slumber' ||
    value === 'echo' ||
    value === 'clock' ||
    value === 'remember' ||
    value === 'acquire' ||
    value === 'chance' ||
    value === 'dice' ||
    value === 'omen' ||
    value === 'lucid' ||
    value === 'mirror' ||
    value === 'nightmare' ||
    value === 'vision' ||
    value === 'sleep' ||
    value === 'whim' ||
    value === 'miracle' ||
    value === 'accident'
  );
}

function isBigNumberSaveValue(value: unknown): value is number | string {
  if (typeof value !== 'number' && typeof value !== 'string') {
    return false;
  }

  if (typeof value === 'string' && value.trim().length === 0) {
    return false;
  }

  try {
    const decimal = toDecimal(value);
    return Number.isFinite(decimal.m) && Number.isFinite(decimal.e);
  } catch {
    return false;
  }
}

function isSavedGameState(value: unknown): value is SerializedGameState {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const saved = value as Partial<SerializedGameState>;
  const workbenchLayoutValid =
    saved.workbenchLayout === undefined ||
    (
      typeof saved.workbenchLayout === 'object' &&
      saved.workbenchLayout !== null &&
      typeof saved.workbenchLayout.noun?.xPercent === 'number' &&
      typeof saved.workbenchLayout.noun?.yPercent === 'number' &&
      typeof saved.workbenchLayout.verb?.xPercent === 'number' &&
      typeof saved.workbenchLayout.verb?.yPercent === 'number'
    );
  const workbenchBoardValid =
    saved.workbenchBoard === undefined ||
    (
      typeof saved.workbenchBoard === 'object' &&
      saved.workbenchBoard !== null &&
      Array.isArray(saved.workbenchBoard.unlockedSlots) &&
      saved.workbenchBoard.unlockedSlots.every((slot) => typeof slot === 'number') &&
      typeof saved.workbenchBoard.placements === 'object' &&
      saved.workbenchBoard.placements !== null &&
      Object.entries(saved.workbenchBoard.placements).every(([wordId, slot]) => isWordId(wordId) && typeof slot === 'number')
    );

  return (
    isBigNumberSaveValue(saved.meaning) &&
    isWordId(saved.activeWordId) &&
    (isWordId(saved.activeNounId) || saved.activeNounId === undefined) &&
    (isWordId(saved.activeVerbId) || saved.activeVerbId === null || saved.activeVerbId === undefined) &&
    Array.isArray(saved.unlockedWordIds) &&
    saved.unlockedWordIds.every(isWordId) &&
    (isWordId(saved.chosenFirstPath) || saved.chosenFirstPath === null) &&
    isBigNumberSaveValue(saved.passiveMeaningPerSecond) &&
    (typeof saved.tenMeaningMilestoneGranted === 'boolean' || saved.tenMeaningMilestoneGranted === undefined) &&
    (
      typeof saved.twentyFiveMeaningMilestoneGranted === 'boolean' ||
      saved.twentyFiveMeaningMilestoneGranted === undefined
    ) &&
    (typeof saved.fiftyMeaningMilestoneGranted === 'boolean' || saved.fiftyMeaningMilestoneGranted === undefined) &&
    (typeof saved.hundredMeaningMilestoneGranted === 'boolean' || saved.hundredMeaningMilestoneGranted === undefined) &&
    (typeof saved.manualStampCount === 'number' || saved.manualStampCount === undefined) &&
    (typeof saved.activeWordStartedAt === 'number' || saved.activeWordStartedAt === undefined) &&
    (typeof saved.stampUpgradeLevel === 'number' || saved.stampUpgradeLevel === undefined) &&
    (typeof saved.filingUpgradeLevel === 'number' || saved.filingUpgradeLevel === undefined) &&
    workbenchLayoutValid &&
    workbenchBoardValid &&
    (typeof saved.dreamUnlocked === 'boolean' || saved.dreamUnlocked === undefined) &&
    (isBigNumberSaveValue(saved.totalMeaningEarned) || saved.totalMeaningEarned === undefined) &&
    (saved.stats === undefined || (typeof saved.stats === 'object' && saved.stats !== null)) &&
    (typeof saved.lastSavedAt === 'number' || saved.lastSavedAt === null || saved.lastSavedAt === undefined)
  );
}

export function parseSavedGameState(value: unknown): SerializedGameState | null {
  return isSavedGameState(value) ? value : null;
}

export function loadGameState(): SerializedGameState | null {
  try {
    const rawSave = window.localStorage.getItem(STORAGE_KEY);

    if (!rawSave) {
      return null;
    }

    const parsedSave: unknown = JSON.parse(rawSave);
    return parseSavedGameState(parsedSave);
  } catch {
    return null;
  }
}

export function serializeGameState(state: GameState): SerializedGameState {
  return {
    ...state,
    meaning: serializeBigNumber(state.meaning),
    passiveMeaningPerSecond: serializeBigNumber(state.passiveMeaningPerSecond),
    totalMeaningEarned: serializeBigNumber(state.totalMeaningEarned),
    stats: serializeGlobalStats(state.stats),
  };
}

export function saveGameState(state: GameState): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeGameState(state)));
}

export function resetGameState(): void {
  window.localStorage.removeItem(STORAGE_KEY);

  for (const key of OLD_STORAGE_KEYS) {
    window.localStorage.removeItem(key);
  }
}
