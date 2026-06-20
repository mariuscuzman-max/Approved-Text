import type {
  GlobalStats,
  SerializedGlobalStats,
  SessionStats,
  TrackedStats,
  VisibleEventType,
} from '../types/game.ts';
import type { BigNumberSource } from './bigNumber.ts';
import { add, max, serializeBigNumber, toDecimal } from './bigNumber.ts';

function createTrackedStats(): TrackedStats {
  return {
    meaningEarnedFromTapping: toDecimal(0),
    meaningEarnedFromPassive: toDecimal(0),
    meaningEarnedFromEvents: toDecimal(0),
    manualStamps: 0,
    generatedTaps: 0,
    bestSingleTapGain: toDecimal(0),
    bestMeaningPerSecond: toDecimal(0),
    upgradesBought: 0,
    eventsSpawned: 0,
    eventsClaimed: 0,
    eventClaims: {
      farm: 0,
      water: 0,
      'dream-bloom': 0,
      'dream-softened-rules': 0,
    },
  };
}

export function createDefaultGlobalStats(): GlobalStats {
  return {
    ...createTrackedStats(),
    totalPlayTimeMs: 0,
  };
}

export function createDefaultSessionStats(startedAt = Date.now()): SessionStats {
  return {
    ...createTrackedStats(),
    startedAt,
  };
}

function safeCount(value: number | undefined): number {
  return Number.isFinite(value) ? Math.max(0, Math.floor(value ?? 0)) : 0;
}

function safeBigNumber(value: BigNumberSource | null | undefined) {
  try {
    return max(value ?? 0, 0);
  } catch {
    return toDecimal(0);
  }
}

export function mergeGlobalStats(
  saved: Partial<SerializedGlobalStats | GlobalStats> | null | undefined,
): GlobalStats {
  const defaults = createDefaultGlobalStats();

  if (!saved) {
    return defaults;
  }

  return {
    meaningEarnedFromTapping: safeBigNumber(saved.meaningEarnedFromTapping),
    meaningEarnedFromPassive: safeBigNumber(saved.meaningEarnedFromPassive),
    meaningEarnedFromEvents: safeBigNumber(saved.meaningEarnedFromEvents),
    manualStamps: safeCount(saved.manualStamps),
    generatedTaps: safeCount(saved.generatedTaps),
    bestSingleTapGain: safeBigNumber(saved.bestSingleTapGain),
    bestMeaningPerSecond: safeBigNumber(saved.bestMeaningPerSecond),
    upgradesBought: safeCount(saved.upgradesBought),
    eventsSpawned: safeCount(saved.eventsSpawned),
    eventsClaimed: safeCount(saved.eventsClaimed),
    eventClaims: {
      farm: safeCount(saved.eventClaims?.farm),
      water: safeCount(saved.eventClaims?.water),
      'dream-bloom': safeCount(saved.eventClaims?.['dream-bloom']),
      'dream-softened-rules': safeCount(saved.eventClaims?.['dream-softened-rules']),
    },
    totalPlayTimeMs: Number.isFinite(saved.totalPlayTimeMs)
      ? Math.max(0, saved.totalPlayTimeMs ?? 0)
      : 0,
  };
}

export function serializeGlobalStats(stats: GlobalStats): SerializedGlobalStats {
  return {
    ...stats,
    meaningEarnedFromTapping: serializeBigNumber(stats.meaningEarnedFromTapping),
    meaningEarnedFromPassive: serializeBigNumber(stats.meaningEarnedFromPassive),
    meaningEarnedFromEvents: serializeBigNumber(stats.meaningEarnedFromEvents),
    bestSingleTapGain: serializeBigNumber(stats.bestSingleTapGain),
    bestMeaningPerSecond: serializeBigNumber(stats.bestMeaningPerSecond),
  };
}

export function recordTap<T extends TrackedStats>(stats: T, gain: BigNumberSource): T {
  return {
    ...stats,
    meaningEarnedFromTapping: add(stats.meaningEarnedFromTapping, gain),
    manualStamps: stats.manualStamps + 1,
    bestSingleTapGain: max(stats.bestSingleTapGain, gain),
  };
}

export function recordPassiveGain<T extends TrackedStats>(
  stats: T,
  gain: BigNumberSource,
  rate: BigNumberSource,
): T {
  return {
    ...stats,
    meaningEarnedFromPassive: add(stats.meaningEarnedFromPassive, gain),
    bestMeaningPerSecond: max(stats.bestMeaningPerSecond, rate),
  };
}

export function recordEventSpawn<T extends TrackedStats>(stats: T): T {
  return { ...stats, eventsSpawned: stats.eventsSpawned + 1 };
}

export function recordEventClaim<T extends TrackedStats>(
  stats: T,
  eventType: VisibleEventType,
  meaningGain: BigNumberSource = 0,
): T {
  return {
    ...stats,
    meaningEarnedFromEvents: add(stats.meaningEarnedFromEvents, meaningGain),
    eventsClaimed: stats.eventsClaimed + 1,
    eventClaims: {
      ...stats.eventClaims,
      [eventType]: stats.eventClaims[eventType] + 1,
    },
  };
}

export function recordUpgradePurchase<T extends TrackedStats>(stats: T): T {
  return { ...stats, upgradesBought: stats.upgradesBought + 1 };
}

export function getTrackedMeaningTotal(stats: TrackedStats) {
  return add(
    add(stats.meaningEarnedFromTapping, stats.meaningEarnedFromPassive),
    stats.meaningEarnedFromEvents,
  );
}

export function formatDuration(durationMs: number): string {
  const totalSeconds = Math.max(0, Math.floor(durationMs / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  return `${minutes}m ${seconds}s`;
}
