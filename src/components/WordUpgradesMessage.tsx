import type { WordDefinition } from '../types/game';
import { formatMeaning, formatRate } from '../utils/format';
import type { BigNumberSource } from '../utils/bigNumber.ts';
import { gte } from '../utils/bigNumber.ts';
import {
  getEffectiveFilingUpgradeCost,
  getEffectiveFilingUpgradeBonus,
  getEffectiveStampUpgradeCost,
  getEffectiveStampUpgradeBonus,
  getFilingUpgradeBonusModifierLabel,
  getFilingUpgradeDiscountModifierLabel,
  getNextUpgradeMilestone,
  getPathBonusLabel,
  getPercentageUpgradeCost,
  getPercentageUpgradeMultiplier,
  getStampUpgradeBonusModifierLabel,
  getStampUpgradeDiscountModifierLabel,
  getUpgradeBaseBonus,
  getUpgradeMilestoneMultiplier,
} from '../utils/upgrades';

interface WordUpgradesMessageProps {
  meaning: BigNumberSource;
  activeWord: WordDefinition;
  activeVerb: WordDefinition | null;
  stampUpgradeLevel: number;
  filingUpgradeLevel: number;
  stampForceLevel: number;
  filingDepthLevel: number;
  percentageUpgradesUnlocked: boolean;
  upgradeCostMultiplier: number;
  onBuyStampUpgrade: () => void;
  onBuyFilingUpgrade: () => void;
  onBuyStampForce: () => void;
  onBuyFilingDepth: () => void;
}

function PercentageUpgradeCard({
  name,
  description,
  level,
  unlocked,
  meaning,
  onBuy,
}: {
  name: string;
  description: string;
  level: number;
  unlocked: boolean;
  meaning: BigNumberSource;
  onBuy: () => void;
}) {
  const cost = getPercentageUpgradeCost(level);
  const canAfford = unlocked && gte(meaning, cost);
  const totalBonusPercent = level * 5;

  return (
    <article className={`rounded-lg border p-3 shadow-sm ${
      unlocked ? 'border-[#decaa9] bg-white' : 'border-stone-300 bg-stone-100 text-stone-500'
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className={`text-lg font-bold ${unlocked ? 'text-[#27211a]' : 'text-stone-500'}`}>{name}</h2>
          <p className="mt-1 text-sm leading-5 text-stone-600">{description}</p>
        </div>
        <span className="rounded border border-stone-300 bg-white/70 px-2 py-1 text-xs font-bold text-stone-600">
          Lv {level}
        </span>
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded border border-stone-300 bg-white/60 px-2 py-2">
          <dt className="text-xs font-bold uppercase text-stone-500">Total bonus</dt>
          <dd className="font-bold text-[#27211a]">+{totalBonusPercent}%</dd>
        </div>
        <div className="rounded border border-stone-300 bg-white/60 px-2 py-2">
          <dt className="text-xs font-bold uppercase text-stone-500">Multiplier</dt>
          <dd className="font-bold text-[#27211a]">x{getPercentageUpgradeMultiplier(level).toFixed(2)}</dd>
        </div>
      </dl>

      <button
        type="button"
        disabled={!canAfford}
        onClick={onBuy}
        className={`mt-3 min-h-11 w-full rounded px-3 py-2 text-sm font-bold transition ${
          canAfford
            ? 'bg-[#2d2922] text-[#fff8e9] hover:bg-[#443d33] active:translate-y-px'
            : 'cursor-not-allowed bg-stone-200 text-stone-500'
        }`}
      >
        {unlocked ? `Buy for ${formatMeaning(cost)} Meaning` : 'Unlocks at 1.00K Meaning'}
      </button>
    </article>
  );
}

function WordUpgradesMessage({
  meaning,
  activeWord,
  activeVerb,
  stampUpgradeLevel,
  filingUpgradeLevel,
  stampForceLevel,
  filingDepthLevel,
  percentageUpgradesUnlocked,
  upgradeCostMultiplier,
  onBuyStampUpgrade,
  onBuyFilingUpgrade,
  onBuyStampForce,
  onBuyFilingDepth,
}: WordUpgradesMessageProps) {
  const stampCost = getEffectiveStampUpgradeCost(stampUpgradeLevel, activeWord, activeVerb, upgradeCostMultiplier);
  const filingCost = getEffectiveFilingUpgradeCost(filingUpgradeLevel, activeWord, activeVerb, upgradeCostMultiplier);
  const stampMultiplier = getUpgradeMilestoneMultiplier(stampUpgradeLevel);
  const filingMultiplier = getUpgradeMilestoneMultiplier(filingUpgradeLevel);
  const nextStampMilestone = getNextUpgradeMilestone(stampUpgradeLevel);
  const nextFilingMilestone = getNextUpgradeMilestone(filingUpgradeLevel);
  const stampBonusModifier = getStampUpgradeBonusModifierLabel(activeWord, activeVerb);
  const stampDiscountModifier = getStampUpgradeDiscountModifierLabel(activeWord, activeVerb);
  const filingBonusModifier = getFilingUpgradeBonusModifierLabel(activeWord, activeVerb);
  const filingDiscountModifier = getFilingUpgradeDiscountModifierLabel(activeWord, activeVerb);
  const canAffordStamp = gte(meaning, stampCost);
  const canAffordFiling = gte(meaning, filingCost);

  return (
    <section className="grid h-full grid-rows-[auto_1fr] gap-3">
      <div className="rounded-lg border border-[#decaa9] bg-white p-3 shadow-sm">
        <div className="text-xs font-semibold uppercase text-stone-500">Current path bonus</div>
        <div className="mt-1 text-sm font-bold text-[#27211a]">{getPathBonusLabel(activeWord)}</div>
        {upgradeCostMultiplier < 1 ? (
          <div className="mt-2 rounded border border-[#cbb5d6] bg-[#f7ecfb] px-2 py-1 text-xs font-bold text-[#5d4770]">
            Softened Rules: upgrade costs -25%
          </div>
        ) : null}
      </div>

      <div className="min-h-0 overflow-y-auto pr-1">
        <div className="grid gap-3">
          <article className="rounded-lg border border-[#decaa9] bg-white p-3 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[#27211a]">Stamp Upgrade</h2>
                <p className="mt-1 text-sm leading-5 text-stone-600">Improves Meaning gained from stamping.</p>
              </div>
              <span className="rounded border border-[#eadbc3] bg-[#fff7e8] px-2 py-1 text-xs font-bold text-stone-600">
                Lv {stampUpgradeLevel}
              </span>
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded border border-[#eadbc3] bg-[#fffaf0] px-2 py-2">
                <dt className="text-xs font-bold uppercase text-stone-500">Base bonus</dt>
                <dd className="font-bold text-[#27211a]">+{formatRate(getUpgradeBaseBonus(stampUpgradeLevel))}/tap</dd>
              </div>
              <div className="rounded border border-[#eadbc3] bg-[#fffaf0] px-2 py-2">
                <dt className="text-xs font-bold uppercase text-stone-500">Multiplier</dt>
                <dd className="font-bold text-[#27211a]">x{stampMultiplier}</dd>
              </div>
              <div className="rounded border border-[#eadbc3] bg-[#fffaf0] px-2 py-2">
                <dt className="text-xs font-bold uppercase text-stone-500">Total bonus</dt>
                <dd className="font-bold text-[#27211a]">+{formatRate(getEffectiveStampUpgradeBonus(stampUpgradeLevel, activeWord, activeVerb))}/tap</dd>
              </div>
              <div className="rounded border border-[#eadbc3] bg-[#fffaf0] px-2 py-2">
                <dt className="text-xs font-bold uppercase text-stone-500">Next milestone</dt>
                <dd className="font-bold text-[#27211a]">
                  {nextStampMilestone ? `Lv ${nextStampMilestone}, x${getUpgradeMilestoneMultiplier(nextStampMilestone)}` : 'Max listed'}
                </dd>
              </div>
            </dl>

            {stampBonusModifier ? (
              <p className="mt-2 rounded border border-[#d8c8ad] bg-[#fffaf0] px-2 py-1 text-xs font-bold text-[#5e6f2d]">
                Active word bonus: {stampBonusModifier}
              </p>
            ) : null}

            {stampDiscountModifier ? (
              <p className="mt-2 rounded border border-[#d8c8ad] bg-[#fffaf0] px-2 py-1 text-xs font-bold text-[#5e6f2d]">
                Active word discount: {stampDiscountModifier}
              </p>
            ) : null}

            <button
              type="button"
              disabled={!canAffordStamp}
              onClick={onBuyStampUpgrade}
              className={`mt-3 min-h-11 w-full rounded px-3 py-2 text-sm font-bold transition ${
                canAffordStamp
                  ? 'bg-[#2d2922] text-[#fff8e9] hover:bg-[#443d33] active:translate-y-px'
                  : 'cursor-not-allowed bg-stone-200 text-stone-500'
              }`}
            >
              Buy for {formatMeaning(stampCost)} Meaning
            </button>
          </article>

          <article className="rounded-lg border border-[#decaa9] bg-white p-3 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[#27211a]">Filing Upgrade</h2>
                <p className="mt-1 text-sm leading-5 text-stone-600">Improves passive Meaning/sec.</p>
              </div>
              <span className="rounded border border-[#eadbc3] bg-[#fff7e8] px-2 py-1 text-xs font-bold text-stone-600">
                Lv {filingUpgradeLevel}
              </span>
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded border border-[#eadbc3] bg-[#fffaf0] px-2 py-2">
                <dt className="text-xs font-bold uppercase text-stone-500">Base bonus</dt>
                <dd className="font-bold text-[#27211a]">+{formatRate(getUpgradeBaseBonus(filingUpgradeLevel))}/sec</dd>
              </div>
              <div className="rounded border border-[#eadbc3] bg-[#fffaf0] px-2 py-2">
                <dt className="text-xs font-bold uppercase text-stone-500">Multiplier</dt>
                <dd className="font-bold text-[#27211a]">x{filingMultiplier}</dd>
              </div>
              <div className="rounded border border-[#eadbc3] bg-[#fffaf0] px-2 py-2">
                <dt className="text-xs font-bold uppercase text-stone-500">Total bonus</dt>
                <dd className="font-bold text-[#27211a]">+{formatRate(getEffectiveFilingUpgradeBonus(filingUpgradeLevel, activeWord, activeVerb))}/sec</dd>
              </div>
              <div className="rounded border border-[#eadbc3] bg-[#fffaf0] px-2 py-2">
                <dt className="text-xs font-bold uppercase text-stone-500">Next milestone</dt>
                <dd className="font-bold text-[#27211a]">
                  {nextFilingMilestone ? `Lv ${nextFilingMilestone}, x${getUpgradeMilestoneMultiplier(nextFilingMilestone)}` : 'Max listed'}
                </dd>
              </div>
            </dl>

            {filingBonusModifier ? (
              <p className="mt-2 rounded border border-[#d8c8ad] bg-[#fffaf0] px-2 py-1 text-xs font-bold text-[#2f778c]">
                Active word bonus: {filingBonusModifier}
              </p>
            ) : null}

            {filingDiscountModifier ? (
              <p className="mt-2 rounded border border-[#d8c8ad] bg-[#fffaf0] px-2 py-1 text-xs font-bold text-[#2f778c]">
                Active word discount: {filingDiscountModifier}
              </p>
            ) : null}

            <button
              type="button"
              disabled={!canAffordFiling}
              onClick={onBuyFilingUpgrade}
              className={`mt-3 min-h-11 w-full rounded px-3 py-2 text-sm font-bold transition ${
                canAffordFiling
                  ? 'bg-[#2d2922] text-[#fff8e9] hover:bg-[#443d33] active:translate-y-px'
                  : 'cursor-not-allowed bg-stone-200 text-stone-500'
              }`}
            >
              Buy for {formatMeaning(filingCost)} Meaning
            </button>
          </article>

          <PercentageUpgradeCard
            name="Stamp Force"
            description="Adds +5% total tap gain per level."
            level={stampForceLevel}
            unlocked={percentageUpgradesUnlocked}
            meaning={meaning}
            onBuy={onBuyStampForce}
          />

          <PercentageUpgradeCard
            name="Filing Depth"
            description="Adds +5% total passive gain per level."
            level={filingDepthLevel}
            unlocked={percentageUpgradesUnlocked}
            meaning={meaning}
            onBuy={onBuyFilingDepth}
          />
        </div>
      </div>
    </section>
  );
}

export default WordUpgradesMessage;
