import type { GameState, WordId } from '../types/game';

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
    value === 'plow' ||
    value === 'fertile' ||
    value === 'season' ||
    value === 'water' ||
    value === 'rain' ||
    value === 'stream' ||
    value === 'river' ||
    value === 'flow' ||
    value === 'reservoir' ||
    value === 'tide' ||
    value === 'current' ||
    value === 'flood' ||
    value === 'ocean' ||
    value === 'dream' ||
    value === 'slumber' ||
    value === 'echo' ||
    value === 'chance' ||
    value === 'dice' ||
    value === 'omen' ||
    value === 'vision' ||
    value === 'sleep' ||
    value === 'whim' ||
    value === 'miracle' ||
    value === 'accident'
  );
}

function isSavedGameState(value: unknown): value is GameState {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const saved = value as Partial<GameState>;
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
    typeof saved.meaning === 'number' &&
    isWordId(saved.activeWordId) &&
    (isWordId(saved.activeNounId) || saved.activeNounId === undefined) &&
    (isWordId(saved.activeVerbId) || saved.activeVerbId === null || saved.activeVerbId === undefined) &&
    Array.isArray(saved.unlockedWordIds) &&
    saved.unlockedWordIds.every(isWordId) &&
    (isWordId(saved.chosenFirstPath) || saved.chosenFirstPath === null) &&
    typeof saved.passiveMeaningPerSecond === 'number' &&
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
    (typeof saved.totalMeaningEarned === 'number' || saved.totalMeaningEarned === undefined) &&
    (typeof saved.lastSavedAt === 'number' || saved.lastSavedAt === null || saved.lastSavedAt === undefined)
  );
}

export function loadGameState(): GameState | null {
  try {
    const rawSave = window.localStorage.getItem(STORAGE_KEY);

    if (!rawSave) {
      return null;
    }

    const parsedSave: unknown = JSON.parse(rawSave);
    return isSavedGameState(parsedSave) ? parsedSave : null;
  } catch {
    return null;
  }
}

export function saveGameState(state: GameState): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetGameState(): void {
  window.localStorage.removeItem(STORAGE_KEY);

  for (const key of OLD_STORAGE_KEYS) {
    window.localStorage.removeItem(key);
  }
}
