import type { BigNumberSource } from './bigNumber.ts';
import { gte } from './bigNumber.ts';

export const FIRST_CHOICE_COST = 1;

export function isFirstPathChoiceUnlocked(meaning: BigNumberSource): boolean {
  return gte(meaning, FIRST_CHOICE_COST);
}
