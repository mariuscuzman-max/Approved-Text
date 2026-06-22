import { getWordById } from '../data/words.ts';
import type { PathTheme, SentenceModifierLink, WordId } from '../types/game.ts';

const CONNECTION_COLORS: Record<PathTheme, string> = {
  starter: '#9a6a36',
  farm: '#4f7a42',
  water: '#277c91',
  chance: '#8260a8',
};

export interface WordConnectionDisplay {
  color: string;
  label: string;
}

export function getModifierConnectionColor(modifierWordId: WordId): string {
  return CONNECTION_COLORS[getWordById(modifierWordId).pathTheme];
}

export function getWordConnectionDisplay(
  links: SentenceModifierLink[],
  wordId: WordId,
): WordConnectionDisplay | null {
  const modifierLink = links.find((link) => link.modifierWordId === wordId);

  if (modifierLink) {
    return {
      color: getModifierConnectionColor(modifierLink.modifierWordId),
      label: `→ ${getWordById(modifierLink.targetNounId).text}`,
    };
  }

  const targetLink = links.find((link) => link.targetNounId === wordId && link.kind === 'verb')
    ?? links.find((link) => link.targetNounId === wordId);

  if (!targetLink) {
    return null;
  }

  return {
    color: getModifierConnectionColor(targetLink.modifierWordId),
    label: `← ${getWordById(targetLink.modifierWordId).text}`,
  };
}
