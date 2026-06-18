import { getUpgradesForPath } from '../data/upgrades';
import type { PathChoice, UpgradeDefinition } from '../types/game';
import { formatMeaning } from '../utils/format';

interface UpgradesScreenProps {
  meaning: number;
  purchasedPath: PathChoice;
  purchasedUpgradeIds: string[];
  onBuyUpgrade: (upgrade: UpgradeDefinition) => void;
}

function UpgradesScreen({ meaning, purchasedPath, purchasedUpgradeIds, onBuyUpgrade }: UpgradesScreenProps) {
  if (!purchasedPath) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg border border-[#decaa9] bg-white p-6 text-center text-base font-bold leading-6 text-[#27211a]">
        Choose Farm or Water on the Main screen to unlock upgrades.
      </div>
    );
  }

  const pathUpgrades = getUpgradesForPath(purchasedPath);

  return (
    <section className="h-full overflow-y-auto pr-1">
      <div className="mb-3">
        <p className="text-xs font-semibold uppercase text-stone-500">
          {purchasedPath === 'farm' ? 'Farm' : 'Water'} upgrades
        </p>
        <h2 className="font-serif text-2xl font-bold text-[#27211a]">Office Improvements</h2>
      </div>

      <div className="grid gap-3">
        {pathUpgrades.map((upgrade) => {
          const isPurchased = purchasedUpgradeIds.includes(upgrade.id);
          const canAfford = meaning >= upgrade.cost;

          return (
            <article
              key={upgrade.id}
              className={`rounded-lg border p-3 shadow-sm ${
                isPurchased
                  ? 'border-[#879a55] bg-[#eff3df]'
                  : canAfford
                    ? 'border-[#decaa9] bg-white'
                    : 'border-[#decaa9] bg-[#f4ead9] opacity-80'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-[#27211a]">{upgrade.name}</h3>
                  <p className="mt-1 text-sm leading-5 text-stone-700">{upgrade.description}</p>
                </div>
                <span className="rounded border border-[#d6bc92] bg-[#fff7e8] px-2 py-1 text-xs font-bold text-stone-600">
                  {isPurchased ? 'Bought' : `${formatMeaning(upgrade.cost)} M`}
                </span>
              </div>

              <div className="mt-3 rounded border border-[#eadbc3] bg-[#fffaf0] px-3 py-2 text-sm font-bold text-[#27211a]">
                {upgrade.effectLabel}
              </div>

              <button
                type="button"
                disabled={isPurchased || !canAfford}
                onClick={() => onBuyUpgrade(upgrade)}
                className={`mt-3 min-h-11 w-full rounded px-3 py-2 text-sm font-bold transition ${
                  isPurchased
                    ? 'cursor-default bg-[#4b5f27] text-white'
                    : canAfford
                      ? 'bg-[#2d2922] text-[#fff8e9] hover:bg-[#443d33] active:translate-y-px'
                      : 'cursor-not-allowed bg-stone-200 text-stone-500'
                }`}
              >
                {isPurchased ? 'Purchased' : canAfford ? 'Buy Upgrade' : 'Not Enough Meaning'}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default UpgradesScreen;
