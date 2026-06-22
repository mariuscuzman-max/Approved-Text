import { useMemo, useState } from 'react';
import { getPathRibbonStyles, getPathThemeStyles, getWordTypeStyles } from '../data/words';
import type { WordDefinition, WordId } from '../types/game';
import type { BigNumberSource } from '../utils/bigNumber.ts';
import { lt } from '../utils/bigNumber.ts';
import { formatMeaning, formatRate } from '../utils/format';

interface DictionaryScreenProps {
  unlockedWords: WordDefinition[];
  lockedPreviewWords: WordDefinition[];
  activeNounId: string;
  activeVerbId: string | null;
  activeAdjectiveId: string | null;
  meaning: BigNumberSource;
  andOwnedCount: number;
  andPurchaseAvailable: boolean;
  andPurchaseCost: BigNumberSource;
  onSelectWord: (wordId: WordDefinition['id']) => void;
  onBuyAnd: () => void;
  onPlaceAnd: () => void;
}

function DictionaryScreen({
  unlockedWords,
  lockedPreviewWords,
  activeNounId,
  activeVerbId,
  activeAdjectiveId,
  meaning,
  andOwnedCount,
  andPurchaseAvailable,
  andPurchaseCost,
  onSelectWord,
  onBuyAnd,
  onPlaceAnd,
}: DictionaryScreenProps) {
  const [search, setSearch] = useState('');
  const normalizedSearch = search.trim().toLowerCase();
  const unlockedWordIds = useMemo(
    () => new Set<WordId>(unlockedWords.map((word) => word.id)),
    [unlockedWords],
  );
  const visibleWords = useMemo(
    () => [...unlockedWords, ...lockedPreviewWords],
    [lockedPreviewWords, unlockedWords],
  );

  const filteredWords = useMemo(() => {
    if (!normalizedSearch) {
      return visibleWords;
    }

    return visibleWords.filter((word) => {
      const searchableText = `${word.text} ${word.type} ${word.pathLabel}`.toLowerCase();
      return searchableText.includes(normalizedSearch);
    });
  }, [normalizedSearch, visibleWords]);

  return (
    <section className="grid h-full grid-rows-[auto_1fr] gap-3">
      <div>
        <div className="mb-2 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase text-stone-500">Unlocked words</p>
            <h2 className="font-serif text-2xl font-bold text-[#27211a]">Dictionary</h2>
          </div>
          <div className="text-xs font-bold text-stone-500">{unlockedWords.length} unlocked</div>
        </div>

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search word, type, or path"
          className="min-h-10 w-full rounded border border-[#decaa9] bg-white px-3 text-sm font-semibold text-[#27211a] outline-none placeholder:text-stone-400 focus:border-[#9a6a36]"
        />
      </div>

      <div className="min-h-0 overflow-y-auto pr-1">
        <div className="grid gap-2">
          {filteredWords.map((word) => (
            (() => {
              const isActiveNoun = activeNounId === word.id;
              const isActiveVerb = activeVerbId === word.id;
              const isActiveAdjective = activeAdjectiveId === word.id;
              const isUnlocked = unlockedWordIds.has(word.id);
              const isAnd = word.id === 'and';
              const activeLabel = isActiveNoun
                ? 'Active noun'
                : isActiveVerb
                  ? 'Active verb'
                  : isActiveAdjective
                    ? 'Active adjective'
                    : null;

              if (isAnd) {
                const canBuyAnd = andPurchaseAvailable && !lt(meaning, andPurchaseCost);

                return (
                  <article
                    key={word.id}
                    className={`rounded-lg border-2 p-2 text-left shadow-sm ${getPathThemeStyles(word.pathTheme)}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-[#27211a]">{word.text}</h3>
                          <span className={`rounded border px-2 py-0.5 text-[0.7rem] font-bold capitalize ${getWordTypeStyles(word.type)}`}>
                            {word.type}
                          </span>
                        </div>
                        <div className={`mt-1 inline-block rounded px-2 py-0.5 text-[0.68rem] font-bold ${getPathRibbonStyles(word.pathTheme)}`}>
                          {word.pathLabel}
                        </div>
                        <p className="mt-2 text-xs leading-4 text-stone-600">{word.effectDescription}</p>
                      </div>

                      <div className="grid shrink-0 grid-cols-2 gap-1 text-center text-[0.68rem] font-bold text-[#27211a]">
                        <div className="rounded border border-[#eadbc3] bg-white/75 px-2 py-1">
                          +{formatMeaning(word.tapValue)}
                        </div>
                        <div className="rounded border border-[#eadbc3] bg-white/75 px-2 py-1">
                          +{formatRate(word.passiveValue)}/s
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between gap-3 border-t border-[#decaa9] pt-2">
                      <div className="text-xs font-semibold text-stone-600">
                        Owned: {andOwnedCount} · Next cost: {formatMeaning(andPurchaseCost)} Meaning
                      </div>
                      <div className="flex gap-1">
                        {andOwnedCount > 0 ? (
                          <button
                            type="button"
                            onClick={onPlaceAnd}
                            className="min-h-9 rounded border border-[#9a6a36] bg-white px-3 text-xs font-bold text-[#6f4f24] transition hover:bg-[#fff7e8]"
                          >
                            Place
                          </button>
                        ) : null}
                        <button
                          type="button"
                          disabled={!canBuyAnd}
                          onClick={onBuyAnd}
                          className="min-h-9 rounded border border-[#9a6a36] bg-[#7a4b2b] px-3 text-xs font-bold text-white transition hover:bg-[#633b22] disabled:cursor-not-allowed disabled:border-stone-300 disabled:bg-stone-300 disabled:text-stone-500"
                        >
                          {andPurchaseAvailable ? 'Buy And' : 'Available at 250'}
                        </button>
                      </div>
                    </div>
                    {andOwnedCount > 0 ? (
                      <p className="mt-1 text-[0.68rem] font-semibold text-stone-500">
                        Each owned copy can occupy one board slot.
                      </p>
                    ) : null}
                  </article>
                );
              }

              return (
            <button
              key={word.id}
              type="button"
              disabled={!isUnlocked}
              onClick={() => onSelectWord(word.id)}
              className={`rounded-lg border-2 p-2 text-left shadow-sm transition ${getPathThemeStyles(word.pathTheme)} ${
                !isUnlocked
                  ? 'cursor-not-allowed grayscale opacity-60'
                  : isActiveNoun || isActiveVerb || isActiveAdjective
                  ? 'ring-2 ring-[#9a6a36] ring-offset-1'
                  : 'hover:brightness-[1.02]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-[#27211a]">{word.text}</h3>
                    <span className={`rounded border px-2 py-0.5 text-[0.7rem] font-bold capitalize ${getWordTypeStyles(word.type)}`}>
                      {word.type}
                    </span>
                  </div>
                  <div className={`mt-1 inline-block rounded px-2 py-0.5 text-[0.68rem] font-bold ${getPathRibbonStyles(word.pathTheme)}`}>
                    {word.pathLabel}
                  </div>
                  {activeLabel ? (
                    <div className="mt-1 inline-block rounded border border-[#cbb58f] bg-white/80 px-2 py-0.5 text-[0.65rem] font-bold text-[#6f4f24]">
                      {activeLabel}
                    </div>
                  ) : null}
                  {!isUnlocked ? (
                    <div className="mt-1 inline-block rounded border border-stone-300 bg-stone-100 px-2 py-0.5 text-[0.65rem] font-bold text-stone-500">
                      Unlocks at {formatMeaning(word.unlockMeaning)} Meaning
                    </div>
                  ) : null}
                </div>

                <div className="grid shrink-0 grid-cols-2 gap-1 text-center text-[0.68rem] font-bold text-[#27211a]">
                  <div className="rounded border border-[#eadbc3] bg-white/75 px-2 py-1">
                    +{formatMeaning(word.tapValue)}
                  </div>
                  <div className="rounded border border-[#eadbc3] bg-white/75 px-2 py-1">
                    +{formatRate(word.passiveValue)}/s
                  </div>
                </div>
              </div>

              <p className="mt-2 line-clamp-2 text-xs leading-4 text-stone-600">{word.definition}</p>
            </button>
              );
            })()
          ))}
        </div>
      </div>
    </section>
  );
}

export default DictionaryScreen;
