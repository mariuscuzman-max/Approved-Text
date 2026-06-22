import type { BigNumber } from './bigNumber.ts';
import { mul, pow } from './bigNumber.ts';

export const AND_BASE_COST = 250;
export const AND_COST_SCALE = 100;

export function getAndPurchaseCost(ownedCount: number): BigNumber {
  return mul(AND_BASE_COST, pow(AND_COST_SCALE, Math.max(0, ownedCount)));
}
