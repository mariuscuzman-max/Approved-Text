import type { GameState, WordDefinition, WordId } from '../types/game';
import type { BigNumberSource } from './bigNumber.ts';
import { gte } from './bigNumber.ts';

export function canTriggerDreamUnlock(
  meaning: BigNumberSource,
  activeNoun: WordDefinition,
  activeVerb: WordDefinition | null,
  dreamUnlocked: boolean,
): boolean {
  return (
    !dreamUnlocked &&
    gte(meaning, 100) &&
    activeNoun.id === 'world' &&
    activeVerb?.id === 'understand'
  );
}

export function getDreamUnlockWordIds(): WordId[] {
  return ['slumber'];
}

export function unlockDreamLayer(state: GameState): GameState {
  return {
    ...state,
    dreamUnlocked: true,
    unlockedWordIds: Array.from(new Set<WordId>([
      ...state.unlockedWordIds,
      ...getDreamUnlockWordIds(),
    ])),
  };
}
