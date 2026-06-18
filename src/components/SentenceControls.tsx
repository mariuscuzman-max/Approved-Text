interface SentenceControlsProps {
  onUnavailable: () => void;
}

function SentenceControls({ onUnavailable }: SentenceControlsProps) {
  return (
    <section className="flex items-center justify-between gap-3 rounded-lg border border-[#decaa9] bg-[#f7eddb] px-3 py-2">
      <div className="text-xs font-semibold uppercase text-stone-500">Sentence slots</div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onUnavailable}
          className="grid h-9 w-9 place-items-center rounded border border-stone-300 bg-white text-lg font-bold text-stone-500 shadow-sm active:translate-y-px"
          aria-label="Add word slot"
        >
          +
        </button>
        <button
          type="button"
          onClick={onUnavailable}
          className="grid h-9 w-9 place-items-center rounded border border-stone-300 bg-white text-lg font-bold text-stone-500 shadow-sm active:translate-y-px"
          aria-label="Remove word slot"
        >
          -
        </button>
      </div>
    </section>
  );
}

export default SentenceControls;
