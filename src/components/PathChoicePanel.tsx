import type { WordDefinition, WordId } from '../types/game';
import { formatMeaning } from '../utils/format';
import { getPathRibbonStyles, getPathThemeStyles } from '../data/words';
import type { BigNumberSource } from '../utils/bigNumber.ts';
import { FIRST_CHOICE_COST, isFirstPathChoiceUnlocked } from '../utils/progression.ts';

interface PathChoicePanelProps {
  meaning: BigNumberSource;
  chosenFirstPath: WordId | null;
  choices: WordDefinition[];
  onChooseWord: (wordId: WordId) => void;
}

function PathChoicePanel({ meaning, chosenFirstPath, choices, onChooseWord }: PathChoicePanelProps) {
  if (chosenFirstPath) {
    return (
      <section className="rounded-lg border border-[#decaa9] bg-[#f7eddb] p-3">
        <div className="text-sm font-bold text-[#27211a]">
          Approved word path: {chosenFirstPath === 'farm' ? 'Farm' : 'Water'}
        </div>
      </section>
    );
  }

  if (!isFirstPathChoiceUnlocked(meaning)) {
    return (
      <section className="rounded-lg border border-[#decaa9] bg-[#f7eddb] p-3 text-sm font-semibold text-stone-600">
        Next word choice unlocks at {formatMeaning(FIRST_CHOICE_COST)} Meaning.
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-[#decaa9] bg-[#f7eddb] p-3">
      <h3 className="font-serif text-xl font-bold text-[#27211a]">Choose the next approved word</h3>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {choices.map((word) => (
          <button
            key={word.id}
            type="button"
            onClick={() => onChooseWord(word.id)}
            className={`min-h-32 rounded border-2 p-3 text-left shadow-sm transition hover:brightness-[1.02] active:translate-y-px ${getPathThemeStyles(word.pathTheme)}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="text-lg font-bold text-[#27211a]">{word.text}</div>
              <div className={`rounded px-2 py-1 text-xs font-bold ${getPathRibbonStyles(word.pathTheme)}`}>
                {word.pathLabel}
              </div>
            </div>
            <div className="mt-1 text-xs font-semibold text-stone-500">Cost: {formatMeaning(word.unlockCost)} Meaning</div>
            <p className="mt-2 text-sm leading-5 text-stone-700">{word.effectDescription}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default PathChoicePanel;
