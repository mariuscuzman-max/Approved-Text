import { useMemo, useState } from 'react';
import { getPathRibbonStyles, getPathThemeStyles, getWordTypeStyles } from '../data/words';
import type { WordDefinition } from '../types/game';
import { formatMeaning, formatRate } from '../utils/format';

interface DictionaryScreenProps {
  unlockedWords: WordDefinition[];
  activeNounId: string;
  activeVerbId: string | null;
  onSelectWord: (wordId: WordDefinition['id']) => void;
}

function DictionaryScreen({ unlockedWords, activeNounId, activeVerbId, onSelectWord }: DictionaryScreenProps) {
  const [search, setSearch] = useState('');
  const normalizedSearch = search.trim().toLowerCase();

  const filteredWords = useMemo(() => {
    if (!normalizedSearch) {
      return unlockedWords;
    }

    return unlockedWords.filter((word) => {
      const searchableText = `${word.text} ${word.type} ${word.pathLabel}`.toLowerCase();
      return searchableText.includes(normalizedSearch);
    });
  }, [normalizedSearch, unlockedWords]);

  return (
    <section className="grid h-full grid-rows-[auto_1fr] gap-3">
      <div>
        <div className="mb-2 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase text-stone-500">Unlocked words</p>
            <h2 className="font-serif text-2xl font-bold text-[#27211a]">Dictionary</h2>
          </div>
          <div className="text-xs font-bold text-stone-500">{filteredWords.length}/{unlockedWords.length}</div>
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
              const activeLabel = isActiveNoun ? 'Active noun' : isActiveVerb ? 'Active verb' : null;

              return (
            <button
              key={word.id}
              type="button"
              onClick={() => onSelectWord(word.id)}
              className={`rounded-lg border-2 p-2 text-left shadow-sm transition ${getPathThemeStyles(word.pathTheme)} ${
                isActiveNoun || isActiveVerb
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
