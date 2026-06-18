interface ResourceBarProps {
  meaning: string;
  passiveMeaningPerSecond: string;
  activeWord: string;
  pathLabel: string;
  activeEventLabel: string | null;
}

function ResourceBar({ meaning, passiveMeaningPerSecond, activeWord, pathLabel, activeEventLabel }: ResourceBarProps) {
  return (
    <section className="border-b border-[#e3d2b7] bg-[#fffaf0] px-4 py-3 shadow-sm">
      <div className="grid grid-cols-[1fr_auto] items-center gap-3">
        <div>
          <div className="text-xs font-semibold uppercase text-stone-500">Meaning</div>
          <div className="font-serif text-3xl font-bold leading-none text-[#27211a]">{meaning}</div>
        </div>
        <div className="text-right">
          <div className="text-xs font-semibold uppercase text-stone-500">Meaning/sec</div>
          <div className="text-base font-bold text-[#27211a]">+{passiveMeaningPerSecond}</div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 text-xs font-bold text-stone-500">
        <span>{activeWord}</span>
        <span className="truncate text-right">{pathLabel}</span>
      </div>
      {activeEventLabel ? (
        <div className="mt-2 rounded border border-[#decaa9] bg-white px-2 py-1 text-center text-xs font-bold text-[#8e2020]">
          {activeEventLabel}
        </div>
      ) : null}
    </section>
  );
}

export default ResourceBar;
