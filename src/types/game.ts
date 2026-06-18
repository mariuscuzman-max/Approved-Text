export type WordType = 'noun' | 'adjective' | 'verb';

export type AppTab = 'main' | 'dictionary' | 'upgrades';

export type WordId =
  | 'apple'
  | 'world'
  | 'understand'
  | 'farm'
  | 'seed'
  | 'soil'
  | 'root'
  | 'grow'
  | 'harvest'
  | 'orchard'
  | 'plow'
  | 'fertile'
  | 'season'
  | 'water'
  | 'rain'
  | 'stream'
  | 'river'
  | 'flow'
  | 'reservoir'
  | 'tide'
  | 'current'
  | 'flood'
  | 'ocean'
  | 'dream'
  | 'slumber'
  | 'echo'
  | 'chance'
  | 'dice'
  | 'omen'
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
export type WorkbenchGridSlot = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

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
  placements: Partial<Record<WordId, WorkbenchGridSlot>>;
}

export interface ParsedSentence {
  orderedWordIds: WordId[];
  activeNounId: WordId;
  effectiveVerbId: WordId | null;
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
  | 'event_spawn_bonus'
  | 'event_duration_bonus'
  | 'event_strength_bonus'
  | 'instant_event_reward'
  | 'chance_bonus'
  | 'offline_bonus'
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

export interface GameState {
  meaning: number;
  activeNounId: WordId;
  activeVerbId: WordId | null;
  activeWordId: WordId;
  unlockedWordIds: WordId[];
  chosenFirstPath: WordId | null;
  passiveMeaningPerSecond: number;
  tenMeaningMilestoneGranted: boolean;
  twentyFiveMeaningMilestoneGranted: boolean;
  fiftyMeaningMilestoneGranted: boolean;
  hundredMeaningMilestoneGranted: boolean;
  manualStampCount: number;
  activeWordStartedAt: number;
  stampUpgradeLevel: number;
  filingUpgradeLevel: number;
  workbenchLayout: WorkbenchLayout;
  workbenchBoard: WorkbenchBoard;
  dreamUnlocked: boolean;
  totalMeaningEarned: number;
  lastSavedAt: number | null;
}

export interface StampEffect {
  id: number;
  x: number;
  y: number;
  value: number;
  label?: string;
}

export type PathEventType = 'farm' | 'water';
export type DreamEventType = 'dream-bloom' | 'dream-softened-rules';
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
