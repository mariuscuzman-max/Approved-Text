import { getWordTypeStyles } from '../data/words';
import type { WordDefinition, WordId, WordProgress } from '../types/game';

interface WordSelectorProps {
  words: WordDefinition[];
  wordProgress: Record<string, WordProgress>;
  activeWordId: WordId;
  onSelectWord: (wordId: WordId) => void;
}

function WordSelector({ words, wordProgress, activeWordId, onSelectWord }: WordSelectorProps) {
  return (
    <section className="mt-4 rounded-lg border border-[#e3d2b7] bg-[#f7eddb] p-3">
      <div className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Dictionary Preview</div>
      <div className="grid gap-2">
        {words.map((word) => {
          const progress = wordProgress[word.id];
          const isUnlocked = progress?.unlocked ?? false;
          const isActive = word.id === activeWordId;

          return (
            <button
              key={word.id}
              type="button"
              disabled={!isUnlocked}
              onClick={() => onSelectWord(word.id)}
              className={`flex min-h-11 items-center justify-between gap-3 rounded border px-3 py-2 text-left text-sm transition ${
                isActive
                  ? 'border-[#9a6a36] bg-white shadow-sm'
                  : isUnlocked
                    ? 'border-[#decaa9] bg-[#fffaf0] hover:bg-white'
                    : 'cursor-not-allowed border-[#decaa9] bg-[#efe4d3] opacity-65'
              }`}
            >
              <span>
                <span className="font-bold capitalize text-[#27211a]">{isUnlocked ? word.text : 'Locked term'}</span>
                {isUnlocked ? (
                  <span className="ml-2 text-xs font-semibold text-stone-500">Lv {progress.level}</span>
                ) : null}
              </span>
              <span className={`rounded border px-2 py-1 text-xs font-bold capitalize ${getWordTypeStyles(word.type)}`}>
                {word.type}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default WordSelector;
