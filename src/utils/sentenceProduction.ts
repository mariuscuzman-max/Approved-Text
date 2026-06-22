import { getWordById } from '../data/words.ts';
import type { ParsedSentence, SentenceNounClause, WordDefinition } from '../types/game.ts';
import type { BigNumber, BigNumberSource } from './bigNumber.ts';
import { add, mul, pow, toDecimal } from './bigNumber.ts';
import {
  applyActiveWordFilingDiscount,
  applyActiveWordStampDiscount,
  applyUpgradeCostFloor,
  getActiveWordTapMultiplier,
  getEffectiveFilingUpgradeBonus,
  getEffectiveStampUpgradeBonus,
  getVerbEffectMultiplier,
  getPassiveGain,
  getTapGain,
  getUpgradeCost,
} from './upgrades.ts';

const AND_TOTAL_PRODUCTION_MULTIPLIER = 1.1;
export const GROW_CURRENT_MEANING_PERCENT = 0.005;
export const FLOW_TRIGGER_INTERVAL_SECONDS = 5 * 60;
export const FLOW_SURGE_DURATION_SECONDS = 30;
export const FLOW_SURGE_PRODUCTION_MULTIPLIER = 1.5;

function getActiveClauses(sentence: ParsedSentence): SentenceNounClause[] {
  if (sentence.nounClauses.length > 0) {
    return sentence.nounClauses;
  }

  return [{
    nounId: sentence.activeNounId,
    effectiveVerbId: sentence.effectiveVerbId,
    effectiveAdjectiveId: sentence.effectiveAdjectiveId,
  }];
}

export interface ActiveSentenceClauseContext {
  noun: WordDefinition;
  verb: WordDefinition | null;
  adjective: WordDefinition | null;
}

export interface SentenceClauseProduction {
  nounId: WordDefinition['id'];
  tapGain: BigNumber;
  passiveGain: BigNumber;
}

export function getActiveSentenceClauseContexts(sentence: ParsedSentence): ActiveSentenceClauseContext[] {
  return getActiveClauses(sentence).map((clause) => ({
    noun: getWordById(clause.nounId),
    verb: clause.effectiveVerbId ? getWordById(clause.effectiveVerbId) : null,
    adjective: clause.effectiveAdjectiveId ? getWordById(clause.effectiveAdjectiveId) : null,
  }));
}

export function hasActiveSentenceVerb(sentence: ParsedSentence, verbId: WordDefinition['id']): boolean {
  return getActiveSentenceClauseContexts(sentence).some((clause) => clause.verb?.id === verbId);
}

export function getGrowClauseTapBonus(
  verb: WordDefinition | null,
  currentMeaning: BigNumberSource,
): BigNumber {
  return verb?.id === 'grow'
    ? mul(currentMeaning, GROW_CURRENT_MEANING_PERCENT)
    : toDecimal(0);
}

export function getFlowSurgeMultiplier(
  sentence: ParsedSentence,
  surgeEndsAt: number | null,
  now = Date.now(),
): number {
  return hasActiveSentenceVerb(sentence, 'flow') && surgeEndsAt !== null && surgeEndsAt > now
    ? FLOW_SURGE_PRODUCTION_MULTIPLIER
    : 1;
}

export function getSentenceEventSpawnMultiplier(sentence: ParsedSentence): number {
  return getActiveSentenceClauseContexts(sentence).reduce((multiplier, clause) => {
    if (
      !clause.noun.implemented ||
      clause.noun.specialEffectType !== 'event_spawn_bonus' ||
      typeof clause.noun.specialEffectValue !== 'number'
    ) {
      return multiplier;
    }

    return Math.max(
      multiplier,
      1 + clause.noun.specialEffectValue * getVerbEffectMultiplier(clause.verb),
    );
  }, 1);
}

export function getSentenceClauseProduction(
  sentence: ParsedSentence,
  stampUpgradeLevel: number,
  filingUpgradeLevel: number,
  activeWordStartedAt = Date.now(),
  now = Date.now(),
  manualStampCount = 0,
  currentMeaning: BigNumberSource = 0,
): SentenceClauseProduction[] {
  return getActiveSentenceClauseContexts(sentence).map((clause) => ({
    nounId: clause.noun.id,
    tapGain: mul(
      add(
        getTapGain(clause.noun, stampUpgradeLevel, clause.verb, clause.adjective),
        getGrowClauseTapBonus(clause.verb, currentMeaning),
      ),
      getActiveWordTapMultiplier(clause.noun, manualStampCount, clause.verb),
    ),
    passiveGain: getPassiveGain(
      clause.noun,
      filingUpgradeLevel,
      activeWordStartedAt,
      now,
      clause.verb,
      clause.adjective,
    ),
  }));
}

export function getActiveStreamClause(sentence: ParsedSentence): ActiveSentenceClauseContext | null {
  return getActiveSentenceClauseContexts(sentence).find((clause) => (
    clause.noun.id === 'stream' &&
    clause.noun.implemented &&
    clause.noun.specialEffectType === 'periodic_passive_burst'
  )) ?? null;
}

export function getSentenceStampUpgradeBonus(sentence: ParsedSentence, level: number): BigNumber {
  return getActiveSentenceClauseContexts(sentence).reduce(
    (total, clause) => add(total, getEffectiveStampUpgradeBonus(level, clause.noun, clause.verb)),
    toDecimal(0),
  );
}

export function getSentenceFilingUpgradeBonus(sentence: ParsedSentence, level: number): BigNumber {
  return getActiveSentenceClauseContexts(sentence).reduce(
    (total, clause) => add(total, getEffectiveFilingUpgradeBonus(level, clause.noun, clause.verb)),
    toDecimal(0),
  );
}

export function getSentenceStampUpgradeCost(
  sentence: ParsedSentence,
  level: number,
  extraCostMultiplier = 1,
): BigNumber {
  const baseCost = getUpgradeCost(level);
  const discountedCost = getActiveSentenceClauseContexts(sentence).reduce(
    (cost, clause) => applyActiveWordStampDiscount(cost, clause.noun, clause.verb),
    baseCost,
  );
  return applyUpgradeCostFloor(baseCost, mul(discountedCost, extraCostMultiplier));
}

export function getSentenceFilingUpgradeCost(
  sentence: ParsedSentence,
  level: number,
  extraCostMultiplier = 1,
): BigNumber {
  const baseCost = getUpgradeCost(level);
  const discountedCost = getActiveSentenceClauseContexts(sentence).reduce(
    (cost, clause) => applyActiveWordFilingDiscount(cost, clause.noun, clause.verb),
    baseCost,
  );
  return applyUpgradeCostFloor(baseCost, mul(discountedCost, extraCostMultiplier));
}

export function getActiveAndProductionMultiplier(activeConnectorCount: number): BigNumber {
  return pow(AND_TOTAL_PRODUCTION_MULTIPLIER, Math.max(0, activeConnectorCount));
}

export function getSentenceTapGain(
  sentence: ParsedSentence,
  stampUpgradeLevel: number,
  manualStampCount = 0,
  currentMeaning: BigNumberSource = 0,
): BigNumber {
  const nounGain = getActiveSentenceClauseContexts(sentence).reduce((total, clause) => {
    return add(
      total,
      mul(
        add(
          getTapGain(clause.noun, stampUpgradeLevel, clause.verb, clause.adjective),
          getGrowClauseTapBonus(clause.verb, currentMeaning),
        ),
        getActiveWordTapMultiplier(clause.noun, manualStampCount, clause.verb),
      ),
    );
  }, toDecimal(0));
  const andWord = getWordById('and');
  const connectorGain = mul(andWord.tapValue, sentence.activeConnectorCount);

  return mul(
    add(nounGain, connectorGain),
    getActiveAndProductionMultiplier(sentence.activeConnectorCount),
  );
}

export function hasSentenceTapProc(sentence: ParsedSentence, manualStampCount: number): boolean {
  return getActiveSentenceClauseContexts(sentence).some((clause) => {
    return getActiveWordTapMultiplier(clause.noun, manualStampCount, clause.verb) > 1;
  });
}

export function getSentencePassiveGain(
  sentence: ParsedSentence,
  filingUpgradeLevel: number,
  activeWordStartedAt = Date.now(),
  now = Date.now(),
): BigNumber {
  const nounGain = getActiveSentenceClauseContexts(sentence).reduce((total, clause) => {
    return add(total, getPassiveGain(
      clause.noun,
      filingUpgradeLevel,
      activeWordStartedAt,
      now,
      clause.verb,
      clause.adjective,
    ));
  }, toDecimal(0));
  const andWord = getWordById('and');
  const connectorGain = mul(andWord.passiveValue, sentence.activeConnectorCount);

  return mul(
    add(nounGain, connectorGain),
    getActiveAndProductionMultiplier(sentence.activeConnectorCount),
  );
}
