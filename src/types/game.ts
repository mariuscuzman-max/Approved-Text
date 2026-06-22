import type { BigNumber } from '../utils/bigNumber.ts';

export type WordType = 'noun' | 'adjective' | 'verb' | 'connector';

export type AppTab = 'main' | 'dictionary' | 'upgrades' | 'stats';

export type WordId =
  | 'apple'
  | 'world'
  | 'understand'
  | 'and'
  | 'heavy'
  | 'still'
  | 'farm'
  | 'seed'
  | 'soil'
  | 'root'
  | 'grow'
  | 'harvest'
  | 'orchard'
  | 'oak'
  | 'plow'
  | 'fertile'
  | 'season'
  | 'water'
  | 'rain'
  | 'stream'
  | 'river'
  | 'flow'
  | 'ice'
  | 'pour'
  | 'reservoir'
  | 'tide'
  | 'lake'
  | 'current'
  | 'flood'
  | 'ocean'
  | 'dream'
  | 'slumber'
  | 'echo'
  | 'clock'
  | 'remember'
  | 'acquire'
  | 'chance'
  | 'dice'
  | 'omen'
  | 'lucid'
  | 'mirror'
  | 'nightmare'
  | 'vision'
  | 'sleep'
  | 'whim'
  | 'miracle'
  | 'accident';

export type PathId = 'starter' | 'manual' | 'idle' | 'chance';

export type PathTheme = 'starter' | 'farm' | 'water' | 'chance';

export type UpgradePath = 'farm' | 'water';

export type PathChoice = UpgradePath | null;

export type WorkbenchSlot = 'noun' | 'verb';
export type WorkbenchGridSlot = 0 | 1 | 2 | 3 | 4 | 5;
export type WorkbenchTokenId = WordId | `and:${number}`;

export interface WorkbenchCardPosition {
  xPercent: number;
  yPercent: number;
}

export interface WorkbenchLayout {
  noun: WorkbenchCardPosition;
  verb: WorkbenchCardPosition;
}

export interface WorkbenchBoard {
  unlockedSlots: WorkbenchGridSlot[];
  placements: Partial<Record<WorkbenchTokenId, WorkbenchGridSlot>>;
}

export interface SentenceNounClause {
  nounId: WordId;
  effectiveVerbId: WordId | null;
  effectiveAdjectiveId: WordId | null;
}

export interface SentenceModifierLink {
  modifierWordId: WordId;
  targetNounId: WordId;
  kind: 'verb' | 'adjective';
}

export interface ParsedSentence {
  orderedWordIds: WordId[];
  activeTokenIds: WorkbenchTokenId[];
  looseTokenIds: WorkbenchTokenId[];
  nounClauses: SentenceNounClause[];
  modifierLinks: SentenceModifierLink[];
  activeConnectorCount: number;
  activeNounId: WordId;
  effectiveVerbId: WordId | null;
  effectiveAdjectiveId: WordId | null;
  sentenceText: string;
  feedback: string;
}

export type SpecialEffectType =
  | 'none'
  | 'double_noun_base'
  | 'tap_multiplier'
  | 'passive_multiplier'
  | 'stamp_upgrade_bonus_multiplier'
  | 'filing_upgrade_bonus_multiplier'
  | 'stamp_upgrade_discount'
  | 'filing_upgrade_discount'
  | 'periodic_passive_burst'
  | 'adjective_tap_base_multiplier'
  | 'adjective_passive_base_multiplier'
  | 'event_spawn_bonus'
  | 'current_meaning_tap_bonus'
  | 'harvest_word_for_run'
  | 'season_cycle'
  | 'timed_idle_surge'
  | 'store_idle_release'
  | 'idle_to_tap'
  | 'recursive_tap_chance'
  | 'timed_chance_reward'
  | 'chance_effect_bonus'
  | 'cross_path_acquisition'
  | 'event_preview_bonus'
  | 'randomness_stabilizer'
  | 'copy_base_stats'
  | 'risk_reward'
  | 'event_duration_bonus'
  | 'event_strength_bonus'
  | 'instant_event_reward'
  | 'chance_bonus'
  | 'offline_bonus'
  | 'connector_production_multiplier'
  | 'future_sentence_synergy';

export type UpgradeEffectType =
  | 'addTapValue'
  | 'multiplyTapValue'
  | 'harvestRoutine'
  | 'addPassiveMeaning'
  | 'multiplyPassiveMeaning';

export interface WordDefinition {
  id: WordId;
  text: string;
  type: WordType;
  pathId: PathId;
  pathLabel: string;
  pathTheme: PathTheme;
  definition: string;
  description: string;
  unlockMeaning: number;
  tapValue: number;
  passiveValue: number;
  effectDescription: string;
  specialEffectType: SpecialEffectType;
  specialEffectValue: number | null;
  implemented: boolean;
  unlockCost: number;
  unlocked: boolean;
  unlocks?: WordId[];
}

export interface EventStatCounts {
  farm: number;
  water: number;
  'dream-bloom': number;
  'dream-softened-rules': number;
  'dream-facedown-truth': number;
  'dream-wheel-of-meaning': number;
}

export interface TrackedStats {
  meaningEarnedFromTapping: BigNumber;
  meaningEarnedFromPassive: BigNumber;
  meaningEarnedFromEvents: BigNumber;
  manualStamps: number;
  generatedTaps: number;
  bestSingleTapGain: BigNumber;
  bestMeaningPerSecond: BigNumber;
  upgradesBought: number;
  eventsSpawned: number;
  eventsClaimed: number;
  eventClaims: EventStatCounts;
}

export interface GlobalStats extends TrackedStats {
  totalPlayTimeMs: number;
}

export interface SessionStats extends TrackedStats {
  startedAt: number;
}

export interface GameState {
  meaning: BigNumber;
  activeNounId: WordId;
  activeVerbId: WordId | null;
  activeAdjectiveId: WordId | null;
  activeWordId: WordId;
  unlockedWordIds: WordId[];
  andOwnedCount: number;
  chosenFirstPath: WordId | null;
  passiveMeaningPerSecond: BigNumber;
  tenMeaningMilestoneGranted: boolean;
  twentyFiveMeaningMilestoneGranted: boolean;
  fiftyMeaningMilestoneGranted: boolean;
  hundredMeaningMilestoneGranted: boolean;
  twoHundredFiftyMeaningMilestoneGranted: boolean;
  thousandMeaningMilestoneGranted: boolean;
  manualStampCount: number;
  activeWordStartedAt: number;
  stampUpgradeLevel: number;
  filingUpgradeLevel: number;
  stampForceLevel: number;
  filingDepthLevel: number;
  workbenchLayout: WorkbenchLayout;
  workbenchBoard: WorkbenchBoard;
  dreamUnlocked: boolean;
  totalMeaningEarned: BigNumber;
  stats: GlobalStats;
  lastSavedAt: number | null;
}

export interface SerializedGameState extends Omit<
  GameState,
  'meaning' | 'passiveMeaningPerSecond' | 'totalMeaningEarned' | 'stats'
> {
  meaning: string | number;
  passiveMeaningPerSecond: string | number;
  totalMeaningEarned?: string | number;
  stats?: SerializedGlobalStats;
}

export interface SerializedGlobalStats extends Omit<
  GlobalStats,
  | 'meaningEarnedFromTapping'
  | 'meaningEarnedFromPassive'
  | 'meaningEarnedFromEvents'
  | 'bestSingleTapGain'
  | 'bestMeaningPerSecond'
> {
  meaningEarnedFromTapping: string | number;
  meaningEarnedFromPassive: string | number;
  meaningEarnedFromEvents: string | number;
  bestSingleTapGain: string | number;
  bestMeaningPerSecond: string | number;
}

export interface StampEffect {
  id: number;
  x: number | string;
  y: number | string;
  value: BigNumber;
  label?: string;
}

export type PathEventType = 'farm' | 'water';
export type DreamEventType =
  | 'dream-bloom'
  | 'dream-softened-rules'
  | 'dream-facedown-truth'
  | 'dream-wheel-of-meaning';
export type VisibleEventType = PathEventType | DreamEventType;

export interface VisiblePathEvent {
  id: number;
  type: VisibleEventType;
  name: string;
  prompt: string;
  xPercent: number;
  yPercent: number;
  expiresAt: number;
}

export interface ActivePathEvent {
  type: VisibleEventType;
  name: string;
  endsAt: number;
  productionMultiplier?: number;
}

export interface WheelRevealState {
  status: 'spinning' | 'revealed';
  resultLabel: string | null;
}

export interface UpgradeDefinition {
  id: string;
  name: string;
  path: UpgradePath;
  cost: number;
  description: string;
  effectLabel: string;
  effectType: UpgradeEffectType;
  effectValue: number;
}

export interface WordProgress {
  id: string;
  level: number;
  unlocked: boolean;
}
