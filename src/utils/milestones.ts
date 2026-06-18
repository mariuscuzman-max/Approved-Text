import type { WordId } from '../types/game';

export function getHundredMeaningUnlockWordIds(chosenFirstPath: WordId | null): WordId[] {
  if (chosenFirstPath === 'farm') {
    return ['grow', 'understand'];
  }

  if (chosenFirstPath === 'water') {
    return ['flow', 'understand'];
  }

  return ['understand'];
}
