import type { ActivePathEvent, PathEventType, VisibleEventType, VisiblePathEvent, WordDefinition } from '../types/game';
import type { BigNumber, BigNumberSource } from './bigNumber.ts';
import { max, mul } from './bigNumber.ts';
import { getVerbEffectMultiplier } from './upgrades.ts';

const EVENT_DURATION_MS = 20_000;
const EVENT_VISIBLE_MS = 10_000;
export const FACEDOWN_TRUTH_DURATION_SECONDS = 10;
export const FACEDOWN_TRUTH_REWARDS = [
  { multiplier: 2, probability: 0.6 },
  { multiplier: 5, probability: 0.3 },
  { multiplier: 10, probability: 0.1 },
] as const;
export const WHEEL_TIMED_MULTIPLIER_DURATION_SECONDS = 10;

export type WheelReward =
  | { id: 'production-15'; probability: 0.4; kind: 'production-seconds'; seconds: 15 }
  | { id: 'production-30'; probability: 0.25; kind: 'production-seconds'; seconds: 30 }
  | { id: 'production-x2'; probability: 0.15; kind: 'timed-production-multiplier'; multiplier: 2; durationSeconds: 10 }
  | { id: 'meaning-x2'; probability: 0.1; kind: 'current-meaning-multiple'; multiplier: 2 }
  | { id: 'nothing'; probability: 0.07; kind: 'nothing' }
  | { id: 'jackpot'; probability: 0.03; kind: 'production-seconds'; seconds: 300 };

export const WHEEL_OF_MEANING_REWARDS: readonly WheelReward[] = [
  { id: 'production-15', probability: 0.4, kind: 'production-seconds', seconds: 15 },
  { id: 'production-30', probability: 0.25, kind: 'production-seconds', seconds: 30 },
  { id: 'production-x2', probability: 0.15, kind: 'timed-production-multiplier', multiplier: 2, durationSeconds: 10 },
  { id: 'meaning-x2', probability: 0.1, kind: 'current-meaning-multiple', multiplier: 2 },
  { id: 'nothing', probability: 0.07, kind: 'nothing' },
  { id: 'jackpot', probability: 0.03, kind: 'production-seconds', seconds: 300 },
];
export const MIN_EVENT_DELAY_SECONDS = 90;
const DREAM_BLOOM_CURRENT_MEANING_PERCENT = 0.10;
const DREAM_BLOOM_MIN_TAP_MULTIPLIER = 10;
const SOFTENED_RULES_COST_MULTIPLIER = 0.75;

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function getEventSpawnMultiplier(
  activeWord: WordDefinition | null,
  effectiveVerb: WordDefinition | null = null,
): number {
  if (
    activeWord?.implemented &&
    activeWord.specialEffectType === 'event_spawn_bonus' &&
    typeof activeWord.specialEffectValue === 'number'
  ) {
    return 1 + activeWord.specialEffectValue * getVerbEffectMultiplier(effectiveVerb);
  }

  return 1;
}

export function getNextPathEventDelayMs(spawnMultiplier = 1): number {
  const minSeconds = 120;
  const maxSeconds = 240;
  const randomDelayMs = ((minSeconds + Math.random() * (maxSeconds - minSeconds)) * 1000) / Math.max(1, spawnMultiplier);
  return Math.max(randomDelayMs, MIN_EVENT_DELAY_SECONDS * 1000);
}

export function getPathEventType(activeWord: WordDefinition | null): PathEventType | null {
  if (activeWord?.pathId === 'manual') {
    return 'farm';
  }

  if (activeWord?.pathId === 'idle') {
    return 'water';
  }

  return null;
}

export function getAvailableEventTypes(activeWord: WordDefinition | null, dreamUnlocked: boolean): VisibleEventType[] {
  if (activeWord?.pathId === 'chance') {
    return dreamUnlocked ? ['dream-facedown-truth'] : [];
  }

  const pathEventType = getPathEventType(activeWord);

  return pathEventType ? [pathEventType] : [];
}

export function getRandomVisibleEventType(activeWord: WordDefinition | null, dreamUnlocked: boolean): VisibleEventType | null {
  const eventTypes = getAvailableEventTypes(activeWord, dreamUnlocked);

  if (eventTypes.length === 0) {
    return null;
  }

  return eventTypes[Math.floor(Math.random() * eventTypes.length)];
}

export function createVisiblePathEvent(type: VisibleEventType): VisiblePathEvent {
  const eventCopy: Record<VisibleEventType, Pick<VisiblePathEvent, 'name' | 'prompt'>> = {
    farm: { name: 'Harvest Window', prompt: 'Stamp now' },
    water: { name: 'Clear Current', prompt: 'Flow quickens' },
    'dream-bloom': { name: 'Meaning Bloom', prompt: 'Meaning flowers' },
    'dream-softened-rules': { name: 'Softened Rules', prompt: 'Costs blur' },
    'dream-facedown-truth': { name: 'Facedown Truth', prompt: 'Choose one card' },
    'dream-wheel-of-meaning': { name: 'Wheel of Meaning', prompt: 'Spin the wheel' },
  };

  return {
    id: Date.now() + Math.random(),
    type,
    name: eventCopy[type].name,
    prompt: eventCopy[type].prompt,
    xPercent: 10 + Math.random() * 80,
    yPercent: 15 + Math.random() * 70,
    expiresAt: Date.now() + EVENT_VISIBLE_MS,
  };
}

export function createActivePathEvent(visibleEvent: VisiblePathEvent): ActivePathEvent {
  return {
    type: visibleEvent.type,
    name: visibleEvent.name,
    endsAt: Date.now() + EVENT_DURATION_MS,
  };
}

export function selectFacedownTruthMultiplier(randomValue = Math.random()): number {
  const roll = Math.max(0, Math.min(randomValue, 0.999999999));
  let cumulativeProbability = 0;

  for (const reward of FACEDOWN_TRUTH_REWARDS) {
    cumulativeProbability += reward.probability;

    if (roll < cumulativeProbability) {
      return reward.multiplier;
    }
  }

  return FACEDOWN_TRUTH_REWARDS[FACEDOWN_TRUTH_REWARDS.length - 1].multiplier;
}

export function createFacedownTruthActiveEvent(
  visibleEvent: VisiblePathEvent,
  randomValue = Math.random(),
): ActivePathEvent {
  return {
    type: 'dream-facedown-truth',
    name: visibleEvent.name,
    endsAt: Date.now() + FACEDOWN_TRUTH_DURATION_SECONDS * 1000,
    productionMultiplier: selectFacedownTruthMultiplier(randomValue),
  };
}

export function getFacedownTruthProductionMultiplier(activePathEvent: ActivePathEvent | null): number {
  if (
    activePathEvent?.type !== 'dream-facedown-truth' ||
    activePathEvent.endsAt <= Date.now()
  ) {
    return 1;
  }

  return activePathEvent.productionMultiplier ?? 1;
}

export function selectWheelOfMeaningReward(randomValue = Math.random()): WheelReward {
  const roll = Math.max(0, Math.min(randomValue, 0.999999999));
  let cumulativeProbability = 0;

  for (const reward of WHEEL_OF_MEANING_REWARDS) {
    cumulativeProbability += reward.probability;

    if (roll < cumulativeProbability) {
      return reward;
    }
  }

  return WHEEL_OF_MEANING_REWARDS[WHEEL_OF_MEANING_REWARDS.length - 1];
}

export function getWheelInstantMeaningGain(
  reward: WheelReward,
  currentMeaning: BigNumberSource,
  totalProductionPerSecond: BigNumberSource,
): BigNumber {
  if (reward.kind === 'production-seconds') {
    return mul(totalProductionPerSecond, reward.seconds);
  }

  if (reward.kind === 'current-meaning-multiple') {
    return mul(currentMeaning, reward.multiplier);
  }

  return mul(currentMeaning, 0);
}

export function createWheelTimedActiveEvent(
  visibleEvent: VisiblePathEvent,
  reward: WheelReward,
): ActivePathEvent | null {
  if (reward.kind !== 'timed-production-multiplier') {
    return null;
  }

  return {
    type: 'dream-wheel-of-meaning',
    name: visibleEvent.name,
    endsAt: Date.now() + reward.durationSeconds * 1000,
    productionMultiplier: reward.multiplier,
  };
}

export function getDreamProductionMultiplier(activePathEvent: ActivePathEvent | null): number {
  if (
    !activePathEvent ||
    activePathEvent.endsAt <= Date.now() ||
    (activePathEvent.type !== 'dream-facedown-truth' && activePathEvent.type !== 'dream-wheel-of-meaning')
  ) {
    return 1;
  }

  return activePathEvent.productionMultiplier ?? 1;
}

export function getFarmEventTapMultiplier(activePathEvent: ActivePathEvent | null): number {
  return activePathEvent?.type === 'farm' ? 2 : 1;
}

export function getSoftenedRulesUpgradeCostMultiplier(activePathEvent: ActivePathEvent | null): number {
  return activePathEvent?.type === 'dream-softened-rules' ? SOFTENED_RULES_COST_MULTIPLIER : 1;
}

export function getMeaningBloomGain(
  currentMeaning: BigNumberSource,
  currentTapGain: BigNumberSource,
): BigNumber {
  return max(
    mul(currentMeaning, DREAM_BLOOM_CURRENT_MEANING_PERCENT),
    mul(currentTapGain, DREAM_BLOOM_MIN_TAP_MULTIPLIER),
  );
}

export function getFlowEventIdleMultiplier(activePathEvent: ActivePathEvent | null, filingUpgradeLevel: number): number {
  if (activePathEvent?.type !== 'water') {
    return 1;
  }

  const flowEventBonusPercent = clamp(filingUpgradeLevel, 10, 100);
  return 1 + flowEventBonusPercent / 100;
}

export function getActivePathEventSecondsRemaining(activePathEvent: ActivePathEvent | null, now: number): number {
  if (!activePathEvent) {
    return 0;
  }

  return Math.max(0, Math.ceil((activePathEvent.endsAt - now) / 1000));
}
