import type { WordDefinition } from '../types/game';

const UPGRADE_BASE_COST = 1;
const UPGRADE_COST_GROWTH = 1.15;
const UPGRADE_BONUS_PER_LEVEL = 0.001;
const UPGRADE_COST_FLOOR_BASE_MULTIPLIER = 0.25;
const UPGRADE_ABSOLUTE_MIN_COST = 0.1;
const FARM_TAP_MULTIPLIER = 1.25;
const FLOW_IDLE_MULTIPLIER = 1.25;
const RIVER_PASSIVE_GROWTH_PER_MINUTE = 0.01;
const ROOT_PROC_INTERVAL = 25;

export const UPGRADE_MILESTONES = [10, 25, 50, 100, 500, 1000];

export function getUpgradeCost(level: number): number {
  return UPGRADE_BASE_COST * Math.pow(UPGRADE_COST_GROWTH, level);
}

export function applyUpgradeCostFloor(baseCost: number, discountedCost: number): number {
  return Math.max(
    discountedCost,
    baseCost * UPGRADE_COST_FLOOR_BASE_MULTIPLIER,
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

export function getUpgradeBaseBonus(level: number): number {
  return level * UPGRADE_BONUS_PER_LEVEL;
}

export function getStampUpgradeBonus(level: number): number {
  return getUpgradeBaseBonus(level) * getUpgradeMilestoneMultiplier(level);
}

export function getFilingUpgradeBonus(level: number): number {
  return getUpgradeBaseBonus(level) * getUpgradeMilestoneMultiplier(level);
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
  baseBonus: number,
  word: WordDefinition,
  verb: WordDefinition | null = null,
): number {
  if (
    word.implemented &&
    word.specialEffectType === 'stamp_upgrade_bonus_multiplier' &&
    typeof word.specialEffectValue === 'number'
  ) {
    return baseBonus * applyVerbToBonusMultiplier(word.specialEffectValue, verb);
  }

  return baseBonus;
}

export function applyActiveWordFilingBonus(
  baseBonus: number,
  word: WordDefinition,
  verb: WordDefinition | null = null,
): number {
  if (
    word.implemented &&
    word.specialEffectType === 'filing_upgrade_bonus_multiplier' &&
    typeof word.specialEffectValue === 'number'
  ) {
    return baseBonus * applyVerbToBonusMultiplier(word.specialEffectValue, verb);
  }

  return baseBonus;
}

export function applyActiveWordStampDiscount(
  baseCost: number,
  word: WordDefinition,
  verb: WordDefinition | null = null,
): number {
  if (
    word.implemented &&
    word.specialEffectType === 'stamp_upgrade_discount' &&
    typeof word.specialEffectValue === 'number'
  ) {
    return baseCost * applyVerbToDiscountMultiplier(word.specialEffectValue, verb);
  }

  return baseCost;
}

export function applyActiveWordFilingDiscount(
  baseCost: number,
  word: WordDefinition,
  verb: WordDefinition | null = null,
): number {
  if (
    word.implemented &&
    word.specialEffectType === 'filing_upgrade_discount' &&
    typeof word.specialEffectValue === 'number'
  ) {
    return baseCost * applyVerbToDiscountMultiplier(word.specialEffectValue, verb);
  }

  return baseCost;
}

export function getEffectiveStampUpgradeBonus(
  level: number,
  word: WordDefinition,
  verb: WordDefinition | null = null,
): number {
  return applyActiveWordStampBonus(getStampUpgradeBonus(level), word, verb);
}

export function getEffectiveFilingUpgradeBonus(
  level: number,
  word: WordDefinition,
  verb: WordDefinition | null = null,
): number {
  return applyActiveWordFilingBonus(getFilingUpgradeBonus(level), word, verb);
}

export function getEffectiveStampUpgradeCost(
  level: number,
  word: WordDefinition,
  verb: WordDefinition | null = null,
  extraCostMultiplier = 1,
): number {
  const baseCost = getUpgradeCost(level);
  const discountedCost = applyActiveWordStampDiscount(baseCost, word, verb) * extraCostMultiplier;
  return applyUpgradeCostFloor(baseCost, discountedCost);
}

export function getEffectiveFilingUpgradeCost(
  level: number,
  word: WordDefinition,
  verb: WordDefinition | null = null,
  extraCostMultiplier = 1,
): number {
  const baseCost = getUpgradeCost(level);
  const discountedCost = applyActiveWordFilingDiscount(baseCost, word, verb) * extraCostMultiplier;
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
  if (word.implemented && word.id === 'river' && word.specialEffectType === 'passive_multiplier') {
    const elapsedMinutes = Math.max(0, now - activeWordStartedAt) / 60000;
    return 1 + elapsedMinutes * RIVER_PASSIVE_GROWTH_PER_MINUTE * getVerbEffectMultiplier(verb);
  }

  return 1;
}

export function getTapGain(
  word: WordDefinition,
  stampUpgradeLevel: number,
  verb: WordDefinition | null = null,
): number {
  const verbNounBaseMultiplier = getVerbNounBaseMultiplier(verb);

  return (
    (word.tapValue * verbNounBaseMultiplier + getEffectiveStampUpgradeBonus(stampUpgradeLevel, word, verb)) *
    getPathTapMultiplier(word)
  );
}

export function getPassiveGain(
  word: WordDefinition,
  filingUpgradeLevel: number,
  activeWordStartedAt = Date.now(),
  now = Date.now(),
  verb: WordDefinition | null = null,
): number {
  const verbNounBaseMultiplier = getVerbNounBaseMultiplier(verb);

  return (
    (word.passiveValue * verbNounBaseMultiplier + getEffectiveFilingUpgradeBonus(filingUpgradeLevel, word, verb)) *
    getPathIdleMultiplier(word) *
    getActiveWordPassiveMultiplier(word, activeWordStartedAt, now, verb)
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

export function getActiveWordPowerLabel(word: WordDefinition, verb: WordDefinition | null = null): string | null {
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
    return `Filing Upgrade cost -${formatPercent(1 - applyVerbToDiscountMultiplier(0.95, verb))}`;
  }

  if (word.id === 'root') {
    return `Every 25th stamp gives x${5 * getVerbEffectMultiplier(verb)} tap gain`;
  }

  if (word.id === 'river') {
    return `Passive gain grows +${formatPercent(RIVER_PASSIVE_GROWTH_PER_MINUTE * getVerbEffectMultiplier(verb))} per minute while active`;
  }

  if (word.id === 'slumber') {
    return 'Events appear 30% more often';
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
