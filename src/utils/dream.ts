import type { WordDefinition, WordId } from '../types/game';

export function canTriggerDreamUnlock(
  meaning: number,
  activeNoun: WordDefinition,
  activeVerb: WordDefinition | null,
  dreamUnlocked: boolean,
): boolean {
  return (
    !dreamUnlocked &&
    meaning >= 100 &&
    activeNoun.id === 'world' &&
    activeVerb?.id === 'understand'
  );
}

export function getDreamUnlockWordIds(): WordId[] {
  return ['slumber'];
}
