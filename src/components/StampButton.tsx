interface StampButtonProps {
  stampCost: number;
  onStamp: () => void;
}

function StampButton({ stampCost, onStamp }: StampButtonProps) {
  return (
    <section className="flex flex-col gap-3">
      <button
        type="button"
        onClick={onStamp}
        className="min-h-28 rounded-lg border-4 border-[#8e2020] bg-[#ba2f2f] px-5 py-5 text-center text-3xl font-black uppercase tracking-[0.18em] text-white shadow-[0_10px_0_#7b1d1d,0_18px_26px_rgba(91,32,24,0.28)] transition active:translate-y-2 active:shadow-[0_2px_0_#7b1d1d,0_10px_18px_rgba(91,32,24,0.22)]"
      >
        Stamp
      </button>

      <div className="grid grid-cols-[1fr_auto] items-center gap-3">
        <button
          type="button"
          disabled
          className="min-h-12 cursor-not-allowed rounded border border-stone-300 bg-stone-100 px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] text-stone-400"
        >
          Reject Locked
        </button>
        <div className="text-right text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
          Cost: {stampCost} Ink
        </div>
      </div>
      <p className="text-center text-xs font-medium text-stone-500">Rejection review not available yet.</p>
    </section>
  );
}

export default StampButton;
