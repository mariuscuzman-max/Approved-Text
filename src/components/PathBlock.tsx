import { getPathRibbonStyles, getPathThemeStyles } from '../data/words';
import type { WordDefinition } from '../types/game';
import { getPathBonusLabel } from '../utils/upgrades';

interface PathBlockProps {
  activeWord: WordDefinition;
  milestone: string;
}

function PathBlock({ activeWord, milestone }: PathBlockProps) {
  return (
    <section className={`rounded-lg border-2 p-3 shadow-sm ${getPathThemeStyles(activeWord.pathTheme)}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase text-stone-500">Current Path</div>
          <h2 className="mt-1 font-serif text-xl font-bold text-[#27211a]">{activeWord.pathLabel}</h2>
        </div>
        <span className={`rounded px-2 py-1 text-xs font-bold ${getPathRibbonStyles(activeWord.pathTheme)}`}>
          {activeWord.text}
        </span>
      </div>
      <div className="mt-3 rounded border border-white/70 bg-white/65 px-3 py-2 text-sm font-bold text-[#27211a]">
        {milestone}
      </div>
      <div className="mt-2 rounded border border-white/70 bg-white/65 px-3 py-2 text-xs font-bold text-stone-700">
        {getPathBonusLabel(activeWord)}
      </div>
    </section>
  );
}

export default PathBlock;
