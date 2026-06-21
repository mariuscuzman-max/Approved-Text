import type { WordId } from '../types/game';
import type { BigNumberSource } from './bigNumber.ts';
import { gte } from './bigNumber.ts';

export function getHundredMeaningUnlockWordIds(chosenFirstPath: WordId | null): WordId[] {
  if (chosenFirstPath === 'farm') {
    return ['grow', 'understand'];
  }

  if (chosenFirstPath === 'water') {
    return ['flow', 'understand'];
  }

  return ['understand'];
}

export function getTwoHundredFiftyMeaningUnlockWordIds(): WordId[] {
  return ['and'];
}

export function getThousandMeaningUnlockWordIds(): WordId[] {
  return ['heavy', 'still'];
}

export function getDreamMilestoneUnlockWordIds(
  meaning: BigNumberSource,
  dreamUnlocked: boolean,
): WordId[] {
  if (!dreamUnlocked) {
    return [];
  }

  const wordIds: WordId[] = [];

  if (gte(meaning, 250)) {
    wordIds.push('echo');
  }

  if (gte(meaning, 1000)) {
    wordIds.push('clock');
  }

  return wordIds;
}
