import type { WordDefinition } from '../types/game.ts';
import type { BigNumber, BigNumberSource } from './bigNumber.ts';
import { mul, toDecimal } from './bigNumber.ts';

export const STREAM_DRIZZLE_INTERVAL_SECONDS = 8;
export const STREAM_DRIZZLE_PASSIVE_SECONDS = 3;
export const UNDERSTAND_STREAM_DRIZZLE_PASSIVE_SECONDS = 6;

export function isStreamDrizzleActive(activeNoun: WordDefinition): boolean {
  return (
    activeNoun.id === 'stream' &&
    activeNoun.implemented &&
    activeNoun.specialEffectType === 'periodic_passive_burst'
  );
}

export function getStreamDrizzlePassiveSeconds(
  activeNoun: WordDefinition,
  effectiveVerb: WordDefinition | null = null,
): number {
  if (!isStreamDrizzleActive(activeNoun)) {
    return 0;
  }

  return effectiveVerb?.id === 'understand'
    ? UNDERSTAND_STREAM_DRIZZLE_PASSIVE_SECONDS
    : STREAM_DRIZZLE_PASSIVE_SECONDS;
}

export function getStreamDrizzleGain(
  currentPassiveGainPerSecond: BigNumberSource,
  activeNoun: WordDefinition,
  effectiveVerb: WordDefinition | null = null,
): BigNumber {
  const passiveSeconds = getStreamDrizzlePassiveSeconds(activeNoun, effectiveVerb);

  if (passiveSeconds === 0) {
    return toDecimal(0);
  }

  return mul(currentPassiveGainPerSecond, passiveSeconds);
}
