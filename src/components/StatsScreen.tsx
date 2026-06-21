import { words } from '../data/words.ts';
import type { GameState, SessionStats } from '../types/game.ts';
import type { BigNumberSource } from '../utils/bigNumber.ts';
import { formatMeaning, formatRate } from '../utils/format.ts';
import { formatDuration, getTrackedMeaningTotal } from '../utils/stats.ts';

interface StatsScreenProps {
  gameState: GameState;
  sessionStats: SessionStats;
  currentTapGain: BigNumberSource;
  currentPassiveGain: BigNumberSource;
  currentSentence: string;
  now: number;
}

function StatRow({ label, value, secondary }: { label: string; value: string; secondary?: string }) {
  return (
    <div className="flex min-h-11 items-center justify-between gap-3 border-b border-[#eadbc3] px-3 py-2 last:border-b-0">
      <div className="text-sm font-semibold text-stone-600">{label}</div>
      <div className="min-w-0 text-right">
        <div className="break-words text-sm font-bold text-[#27211a]">{value}</div>
        {secondary ? <div className="text-[0.68rem] font-semibold text-stone-400">{secondary}</div> : null}
      </div>
    </div>
  );
}

function StatSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 font-serif text-lg font-bold text-[#27211a]">{title}</h2>
      <div className="overflow-hidden rounded-lg border border-[#decaa9] bg-white shadow-sm">{children}</div>
    </section>
  );
}

function StatsScreen({
  gameState,
  sessionStats,
  currentTapGain,
  currentPassiveGain,
  currentSentence,
  now,
}: StatsScreenProps) {
  const implementedWordsUnlocked = gameState.unlockedWordIds.filter((wordId) => {
    return words.find((word) => word.id === wordId)?.implemented;
  }).length;
  const chosenPath = gameState.chosenFirstPath === 'farm'
    ? 'Farm / Ground'
    : gameState.chosenFirstPath === 'water'
      ? 'Water / Flow'
      : 'Starter';

  return (
    <div className="grid content-start gap-5 pb-2">
      <div>
        <p className="text-xs font-semibold uppercase text-stone-500">Player record</p>
        <h2 className="font-serif text-2xl font-bold text-[#27211a]">Stats</h2>
      </div>

      <StatSection title="Overview">
        <StatRow label="Current Meaning" value={formatMeaning(gameState.meaning)} />
        <StatRow label="Meaning/sec" value={`+${formatRate(currentPassiveGain)}`} />
        <StatRow label="Current tap" value={`+${formatMeaning(currentTapGain)}`} />
        <StatRow label="Chosen path" value={chosenPath} />
        <StatRow label="Dream unlocked" value={gameState.dreamUnlocked ? 'Yes' : 'No'} />
        <StatRow label="Current sentence" value={currentSentence || 'World'} />
      </StatSection>

      <StatSection title="Meaning">
        <StatRow
          label="Total earned"
          value={formatMeaning(gameState.totalMeaningEarned)}
          secondary={`Session ${formatMeaning(getTrackedMeaningTotal(sessionStats))}`}
        />
        <StatRow
          label="From tapping"
          value={formatMeaning(gameState.stats.meaningEarnedFromTapping)}
          secondary={`Session ${formatMeaning(sessionStats.meaningEarnedFromTapping)}`}
        />
        <StatRow
          label="From passive"
          value={formatMeaning(gameState.stats.meaningEarnedFromPassive)}
          secondary={`Session ${formatMeaning(sessionStats.meaningEarnedFromPassive)}`}
        />
        <StatRow
          label="From events"
          value={formatMeaning(gameState.stats.meaningEarnedFromEvents)}
          secondary={`Session ${formatMeaning(sessionStats.meaningEarnedFromEvents)}`}
        />
        <StatRow
          label="Best single tap"
          value={formatMeaning(gameState.stats.bestSingleTapGain)}
          secondary={`Session ${formatMeaning(sessionStats.bestSingleTapGain)}`}
        />
        <StatRow
          label="Best Meaning/sec"
          value={formatRate(gameState.stats.bestMeaningPerSecond)}
          secondary={`Session ${formatRate(sessionStats.bestMeaningPerSecond)}`}
        />
      </StatSection>

      <StatSection title="Actions">
        <StatRow label="Manual stamps" value={gameState.stats.manualStamps.toLocaleString()} secondary={`Session ${sessionStats.manualStamps.toLocaleString()}`} />
        <StatRow label="Generated taps" value={gameState.stats.generatedTaps.toLocaleString()} secondary="Not generated yet" />
        <StatRow label="Upgrades bought" value={gameState.stats.upgradesBought.toLocaleString()} secondary={`Session ${sessionStats.upgradesBought.toLocaleString()}`} />
        <StatRow label="Events spawned" value={gameState.stats.eventsSpawned.toLocaleString()} secondary={`Session ${sessionStats.eventsSpawned.toLocaleString()}`} />
        <StatRow label="Events claimed" value={gameState.stats.eventsClaimed.toLocaleString()} secondary={`Session ${sessionStats.eventsClaimed.toLocaleString()}`} />
        <StatRow label="Meaning Blooms" value={gameState.stats.eventClaims['dream-bloom'].toLocaleString()} secondary={`Session ${sessionStats.eventClaims['dream-bloom'].toLocaleString()}`} />
        <StatRow label="Softened Rules" value={gameState.stats.eventClaims['dream-softened-rules'].toLocaleString()} secondary={`Session ${sessionStats.eventClaims['dream-softened-rules'].toLocaleString()}`} />
        <StatRow label="Facedown Truth" value={gameState.stats.eventClaims['dream-facedown-truth'].toLocaleString()} secondary={`Session ${sessionStats.eventClaims['dream-facedown-truth'].toLocaleString()}`} />
        <StatRow label="Wheel of Meaning" value={gameState.stats.eventClaims['dream-wheel-of-meaning'].toLocaleString()} secondary={`Session ${sessionStats.eventClaims['dream-wheel-of-meaning'].toLocaleString()}`} />
        <StatRow label="Farm events" value={gameState.stats.eventClaims.farm.toLocaleString()} secondary={`Session ${sessionStats.eventClaims.farm.toLocaleString()}`} />
        <StatRow label="Water events" value={gameState.stats.eventClaims.water.toLocaleString()} secondary={`Session ${sessionStats.eventClaims.water.toLocaleString()}`} />
      </StatSection>

      <StatSection title="Progress">
        <StatRow label="Words unlocked" value={`${gameState.unlockedWordIds.length} / ${words.length}`} />
        <StatRow label="Implemented words unlocked" value={implementedWordsUnlocked.toLocaleString()} />
        <StatRow label="Board slots unlocked" value={`${gameState.workbenchBoard.unlockedSlots.length} / 9`} />
        <StatRow label="Stamp Upgrade" value={`Level ${gameState.stampUpgradeLevel}`} />
        <StatRow label="Filing Upgrade" value={`Level ${gameState.filingUpgradeLevel}`} />
        <StatRow label="Stamp Force" value={`Level ${gameState.stampForceLevel}`} />
        <StatRow label="Filing Depth" value={`Level ${gameState.filingDepthLevel}`} />
      </StatSection>

      <StatSection title="Time">
        <StatRow label="Total time played" value={formatDuration(gameState.stats.totalPlayTimeMs)} />
        <StatRow label="Current session" value={formatDuration(now - sessionStats.startedAt)} />
      </StatSection>
    </div>
  );
}

export default StatsScreen;
