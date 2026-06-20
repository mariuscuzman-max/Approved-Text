import type { WordDefinition } from '../types/game';
import type { BigNumber, BigNumberSource } from './bigNumber.ts';
import { add, max as bigMax, mul, pow, toDecimal } from './bigNumber.ts';
import { getStreamDrizzlePassiveSeconds, STREAM_DRIZZLE_INTERVAL_SECONDS } from './stream.ts';

const UPGRADE_BASE_COST = 1;
const UPGRADE_COST_GROWTH = 1.15;
const UPGRADE_BONUS_PER_LEVEL = 0.001;
const UPGRADE_COST_FLOOR_BASE_MULTIPLIER = 0.25;
const UPGRADE_ABSOLUTE_MIN_COST = 0.1;
const FARM_TAP_MULTIPLIER = 1.25;
const FLOW_IDLE_MULTIPLIER = 1.25;
const RIVER_PASSIVE_GROWTH_PER_MINUTE = 0.01;
export const RIVER_PASSIVE_GROWTH_CAP = 2;
const ROOT_PROC_INTERVAL = 25;

export const UPGRADE_MILESTONES = [10, 25, 50, 100, 500, 1000];

export function getUpgradeCost(level: number): BigNumber {
  return mul(UPGRADE_BASE_COST, pow(UPGRADE_COST_GROWTH, level));
}

export function applyUpgradeCostFloor(
  baseCost: BigNumberSource,
  discountedCost: BigNumberSource,
): BigNumber {
  return bigMax(
    bigMax(discountedCost, mul(baseCost, UPGRADE_COST_FLOOR_BASE_MULTIPLIER)),
    UPGRADE_ABSOLUTE_MIN_COST,
  );
}

export function getUpgradeMilestoneMultiplier(level: number): number {
  const reachedMilestoneCount = UPGRADE_MILESTONES.filter((milestone) => level >= milestone).length;
  return 2 ** reachedMilestoneCount;
}

export function getNextUpgradeMilestone(level: number): number | null {
  return UPGRADE_MILESTONES.find((milestone) => level < milestone) ?? null;
}

export function getUpgradeBaseBonus(level: number): BigNumber {
  return toDecimal(level * UPGRADE_BONUS_PER_LEVEL);
}

export function getStampUpgradeBonus(level: number): BigNumber {
  return mul(getUpgradeBaseBonus(level), getUpgradeMilestoneMultiplier(level));
}

export function getFilingUpgradeBonus(level: number): BigNumber {
  return mul(getUpgradeBaseBonus(level), getUpgradeMilestoneMultiplier(level));
}

export function getPathTapMultiplier(word: WordDefinition): number {
  return word.pathId === 'manual' ? FARM_TAP_MULTIPLIER : 1;
}

export function getPathIdleMultiplier(word: WordDefinition): number {
  return word.pathId === 'idle' ? FLOW_IDLE_MULTIPLIER : 1;
}

export function getVerbNounBaseMultiplier(verb: WordDefinition | null): number {
  if (
    verb?.implemented &&
    verb.specialEffectType === 'double_noun_base' &&
    typeof verb.specialEffectValue === 'number'
  ) {
    return verb.specialEffectValue;
  }

  return 1;
}

export function getVerbEffectMultiplier(verb: WordDefinition | null): number {
  return getVerbNounBaseMultiplier(verb);
}

function applyVerbToBonusMultiplier(multiplier: number, verb: WordDefinition | null): number {
  return 1 + (multiplier - 1) * getVerbEffectMultiplier(verb);
}

function applyVerbToDiscountMultiplier(multiplier: number, verb: WordDefinition | null): number {
  return Math.max(0, 1 - (1 - multiplier) * getVerbEffectMultiplier(verb));
}

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function applyActiveWordStampBonus(
  baseBonus: BigNumberSource,
  word: WordDefinition,
  verb: WordDefinition | null = null,
): BigNumber {
  if (
    word.implemented &&
    word.specialEffectType === 'stamp_upgrade_bonus_multiplier' &&
    typeof word.specialEffectValue === 'number'
  ) {
    return mul(baseBonus, applyVerbToBonusMultiplier(word.specialEffectValue, verb));
  }

  return toDecimal(baseBonus);
}

export function applyActiveWordFilingBonus(
  baseBonus: BigNumberSource,
  word: WordDefinition,
  verb: WordDefinition | null = null,
): BigNumber {
  if (
    word.implemented &&
    word.specialEffectType === 'filing_upgrade_bonus_multiplier' &&
    typeof word.specialEffectValue === 'number'
  ) {
    return mul(baseBonus, applyVerbToBonusMultiplier(word.specialEffectValue, verb));
  }

  return toDecimal(baseBonus);
}

export function applyActiveWordStampDiscount(
  baseCost: BigNumberSource,
  word: WordDefinition,
  verb: WordDefinition | null = null,
): BigNumber {
  if (
    word.implemented &&
    word.specialEffectType === 'stamp_upgrade_discount' &&
    typeof word.specialEffectValue === 'number'
  ) {
    return mul(baseCost, applyVerbToDiscountMultiplier(word.specialEffectValue, verb));
  }

  return toDecimal(baseCost);
}

export function applyActiveWordFilingDiscount(
  baseCost: BigNumberSource,
  word: WordDefinition,
  verb: WordDefinition | null = null,
): BigNumber {
  if (
    word.implemented &&
    word.specialEffectType === 'filing_upgrade_discount' &&
    typeof word.specialEffectValue === 'number'
  ) {
    return mul(baseCost, applyVerbToDiscountMultiplier(word.specialEffectValue, verb));
  }

  return toDecimal(baseCost);
}

export function getEffectiveStampUpgradeBonus(
  level: number,
  word: WordDefinition,
  verb: WordDefinition | null = null,
): BigNumber {
  return applyActiveWordStampBonus(getStampUpgradeBonus(level), word, verb);
}

export function getEffectiveFilingUpgradeBonus(
  level: number,
  word: WordDefinition,
  verb: WordDefinition | null = null,
): BigNumber {
  return applyActiveWordFilingBonus(getFilingUpgradeBonus(level), word, verb);
}

export function getEffectiveStampUpgradeCost(
  level: number,
  word: WordDefinition,
  verb: WordDefinition | null = null,
  extraCostMultiplier = 1,
): BigNumber {
  const baseCost = getUpgradeCost(level);
  const discountedCost = mul(applyActiveWordStampDiscount(baseCost, word, verb), extraCostMultiplier);
  return applyUpgradeCostFloor(baseCost, discountedCost);
}

export function getEffectiveFilingUpgradeCost(
  level: number,
  word: WordDefinition,
  verb: WordDefinition | null = null,
  extraCostMultiplier = 1,
): BigNumber {
  const baseCost = getUpgradeCost(level);
  const discountedCost = mul(applyActiveWordFilingDiscount(baseCost, word, verb), extraCostMultiplier);
  return applyUpgradeCostFloor(baseCost, discountedCost);
}

export function getActiveWordTapMultiplier(
  word: WordDefinition,
  manualStampCount: number,
  verb: WordDefinition | null = null,
): number {
  if (
    word.implemented &&
    word.id === 'root' &&
    word.specialEffectType === 'tap_multiplier' &&
    typeof word.specialEffectValue === 'number' &&
    manualStampCount > 0 &&
    manualStampCount % ROOT_PROC_INTERVAL === 0
  ) {
    return word.specialEffectValue * getVerbEffectMultiplier(verb);
  }

  return 1;
}

export function getRootCharge(manualStampCount: number): number {
  return manualStampCount % ROOT_PROC_INTERVAL;
}

export function getRootChargeLabel(manualStampCount: number): string {
  return `${getRootCharge(manualStampCount)}/${ROOT_PROC_INTERVAL}`;
}

export function getActiveWordPassiveMultiplier(
  word: WordDefinition,
  activeWordStartedAt: number,
  now: number,
  verb: WordDefinition | null = null,
): number {
  return 1 + getRiverPassiveIncrease(word, activeWordStartedAt, now, verb);
}

export function getRiverPassiveIncrease(
  word: WordDefinition,
  activeWordStartedAt: number,
  now: number,
  verb: WordDefinition | null = null,
): number {
  if (!word.implemented || word.id !== 'river' || word.specialEffectType !== 'passive_multiplier') {
    return 0;
  }

  const elapsedMinutes = Math.max(0, now - activeWordStartedAt) / 60000;
  const uncappedIncrease = elapsedMinutes * RIVER_PASSIVE_GROWTH_PER_MINUTE * getVerbEffectMultiplier(verb);
  return Math.min(uncappedIncrease, RIVER_PASSIVE_GROWTH_CAP);
}

export function getTapGain(
  word: WordDefinition,
  stampUpgradeLevel: number,
  verb: WordDefinition | null = null,
): BigNumber {
  const verbNounBaseMultiplier = getVerbNounBaseMultiplier(verb);

  return mul(
    add(
      mul(word.tapValue, verbNounBaseMultiplier),
      getEffectiveStampUpgradeBonus(stampUpgradeLevel, word, verb),
    ),
    getPathTapMultiplier(word),
  );
}

export function getPassiveGain(
  word: WordDefinition,
  filingUpgradeLevel: number,
  activeWordStartedAt = Date.now(),
  now = Date.now(),
  verb: WordDefinition | null = null,
): BigNumber {
  const verbNounBaseMultiplier = getVerbNounBaseMultiplier(verb);

  return mul(
    mul(
      add(
        mul(word.passiveValue, verbNounBaseMultiplier),
        getEffectiveFilingUpgradeBonus(filingUpgradeLevel, word, verb),
      ),
      getPathIdleMultiplier(word),
    ),
    getActiveWordPassiveMultiplier(word, activeWordStartedAt, now, verb),
  );
}

export function getPathBonusLabel(word: WordDefinition): string {
  if (word.pathId === 'manual') {
    return 'Path bonus: +25% tapping power';
  }

  if (word.pathId === 'idle') {
    return 'Path bonus: +25% passive Meaning/sec';
  }

  return 'Path bonus: none';
}

export function getActiveWordPowerLabel(
  word: WordDefinition,
  verb: WordDefinition | null = null,
  activeWordStartedAt = Date.now(),
  now = Date.now(),
): string | null {
  if (!word.implemented) {
    return null;
  }

  if (word.id === 'seed') {
    return `Stamp Upgrade bonus +${formatPercent((applyVerbToBonusMultiplier(1.1, verb) - 1))}`;
  }

  if (word.id === 'rain') {
    return `Filing Upgrade bonus +${formatPercent((applyVerbToBonusMultiplier(1.1, verb) - 1))}`;
  }

  if (word.id === 'soil') {
    return `Stamp Upgrade cost -${formatPercent(1 - applyVerbToDiscountMultiplier(0.95, verb))}`;
  }

  if (word.id === 'stream') {
    return `Every ${STREAM_DRIZZLE_INTERVAL_SECONDS}s, gain ${getStreamDrizzlePassiveSeconds(word, verb)}s of passive Meaning`;
  }

  if (word.id === 'root') {
    return `Every 25th stamp gives x${5 * getVerbEffectMultiplier(verb)} tap gain`;
  }

  if (word.id === 'river') {
    const currentIncrease = getRiverPassiveIncrease(word, activeWordStartedAt, now, verb);
    const currentPercent = currentIncrease * 100;
    const displayedPercent = Number.isInteger(currentPercent) ? currentPercent.toFixed(0) : currentPercent.toFixed(1);
    return `Passive +${displayedPercent}% (+${formatPercent(RIVER_PASSIVE_GROWTH_PER_MINUTE * getVerbEffectMultiplier(verb))}/min, cap +200%)`;
  }

  if (word.id === 'slumber') {
    return `Events appear ${30 * getVerbEffectMultiplier(verb)}% more often`;
  }

  if (word.id === 'understand') {
    return 'Doubles the active noun base tap and passive values';
  }

  return null;
}

export function getStampUpgradeBonusModifierLabel(word: WordDefinition, verb: WordDefinition | null = null): string | null {
  return word.implemented && word.specialEffectType === 'stamp_upgrade_bonus_multiplier'
    ? `${word.text} +${formatPercent(applyVerbToBonusMultiplier(word.specialEffectValue ?? 1, verb) - 1)}`
    : null;
}

export function getFilingUpgradeBonusModifierLabel(word: WordDefinition, verb: WordDefinition | null = null): string | null {
  return word.implemented && word.specialEffectType === 'filing_upgrade_bonus_multiplier'
    ? `${word.text} +${formatPercent(applyVerbToBonusMultiplier(word.specialEffectValue ?? 1, verb) - 1)}`
    : null;
}

export function getStampUpgradeDiscountModifierLabel(word: WordDefinition, verb: WordDefinition | null = null): string | null {
  return word.implemented && word.specialEffectType === 'stamp_upgrade_discount'
    ? `${word.text} -${formatPercent(1 - applyVerbToDiscountMultiplier(word.specialEffectValue ?? 1, verb))}`
    : null;
}

export function getFilingUpgradeDiscountModifierLabel(word: WordDefinition, verb: WordDefinition | null = null): string | null {
  return word.implemented && word.specialEffectType === 'filing_upgrade_discount'
    ? `${word.text} -${formatPercent(1 - applyVerbToDiscountMultiplier(word.specialEffectValue ?? 1, verb))}`
    : null;
}
