import type { ActivePathEvent, PathEventType, VisibleEventType, VisiblePathEvent, WordDefinition, WordId } from '../types/game';

const EVENT_DURATION_MS = 20_000;
const EVENT_VISIBLE_MS = 10_000;
const MIN_EVENT_DELAY_MS = 90_000;
const DREAM_BLOOM_CURRENT_MEANING_PERCENT = 0.10;
const DREAM_BLOOM_MIN_TAP_MULTIPLIER = 10;
const SOFTENED_RULES_COST_MULTIPLIER = 0.75;

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function getEventSpawnMultiplier(activeWord: WordDefinition | null): number {
  if (
    activeWord?.implemented &&
    activeWord.specialEffectType === 'event_spawn_bonus' &&
    typeof activeWord.specialEffectValue === 'number'
  ) {
    return 1 + activeWord.specialEffectValue;
  }

  return 1;
}

export function getNextPathEventDelayMs(spawnMultiplier = 1): number {
  const minSeconds = 120;
  const maxSeconds = 240;
  const randomDelayMs = ((minSeconds + Math.random() * (maxSeconds - minSeconds)) * 1000) / Math.max(1, spawnMultiplier);
  return Math.max(randomDelayMs, MIN_EVENT_DELAY_MS);
}

export function getPathEventType(chosenFirstPath: WordId | null): PathEventType | null {
  if (chosenFirstPath === 'farm') {
    return 'farm';
  }

  if (chosenFirstPath === 'water') {
    return 'water';
  }

  return null;
}

export function getAvailableEventTypes(chosenFirstPath: WordId | null, dreamUnlocked: boolean): VisibleEventType[] {
  const eventTypes: VisibleEventType[] = [];
  const pathEventType = getPathEventType(chosenFirstPath);

  if (pathEventType) {
    eventTypes.push(pathEventType);
  }

  if (dreamUnlocked) {
    eventTypes.push('dream-bloom', 'dream-softened-rules');
  }

  return eventTypes;
}

export function getRandomVisibleEventType(chosenFirstPath: WordId | null, dreamUnlocked: boolean): VisibleEventType | null {
  const eventTypes = getAvailableEventTypes(chosenFirstPath, dreamUnlocked);

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

export function getFarmEventTapMultiplier(activePathEvent: ActivePathEvent | null): number {
  return activePathEvent?.type === 'farm' ? 2 : 1;
}

export function getSoftenedRulesUpgradeCostMultiplier(activePathEvent: ActivePathEvent | null): number {
  return activePathEvent?.type === 'dream-softened-rules' ? SOFTENED_RULES_COST_MULTIPLIER : 1;
}

export function getMeaningBloomGain(currentMeaning: number, currentTapGain: number): number {
  return Math.max(
    currentMeaning * DREAM_BLOOM_CURRENT_MEANING_PERCENT,
    currentTapGain * DREAM_BLOOM_MIN_TAP_MULTIPLIER,
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
