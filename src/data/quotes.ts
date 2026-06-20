export interface GameQuote {
  text: string;
  author: string;
  category: 'words' | 'meaning' | 'reality' | 'dreaming' | 'time' | 'growth' | 'memory';
}

// Original lines written for Approved Text keep the ambient feed attribution-safe.
export const gameQuotes: GameQuote[] = [
  { text: 'A word is small until it is believed.', author: 'Approved Text', category: 'words' },
  { text: 'Meaning gathers where attention returns.', author: 'Approved Text', category: 'meaning' },
  { text: 'The world begins as a sentence you dare to keep.', author: 'Approved Text', category: 'reality' },
  { text: 'What is understood once may be dreamed again.', author: 'Approved Text', category: 'dreaming' },
  { text: 'Growth is a slow agreement between time and form.', author: 'Approved Text', category: 'growth' },
  { text: 'Still water remembers the shape of the sky.', author: 'Approved Text', category: 'memory' },
  { text: 'Every stamp is a small refusal of nothing.', author: 'Approved Text', category: 'meaning' },
  { text: 'Time files every moment under becoming.', author: 'Approved Text', category: 'time' },
  { text: 'Some words wait years for reality to notice them.', author: 'Approved Text', category: 'words' },
  { text: 'Memory is meaning that learned to remain.', author: 'Approved Text', category: 'memory' },
  { text: 'A dream is a draft the world has not approved.', author: 'Approved Text', category: 'dreaming' },
  { text: 'Reality grows around the names we give it.', author: 'Approved Text', category: 'reality' },
  { text: 'To name a thing is to ask it to remain.', author: 'Approved Text', category: 'words' },
  { text: 'Dreams are meanings before they learn to stand.', author: 'Approved Text', category: 'dreaming' },
  { text: 'The page waits without judgment.', author: 'Approved Text', category: 'time' },
];

export function selectQuoteIndex(
  quoteCount: number,
  previousIndex: number | null = null,
  randomValue = Math.random(),
): number {
  if (quoteCount <= 0) {
    return -1;
  }

  const safeRandom = Math.max(0, Math.min(randomValue, 0.999999999));
  let index = Math.floor(safeRandom * quoteCount);

  if (quoteCount > 1 && index === previousIndex) {
    index = (index + 1) % quoteCount;
  }

  return index;
}
