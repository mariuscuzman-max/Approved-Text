import { getWordById } from '../data/words.ts';
import type { ParsedSentence, WordId, WorkbenchBoard, WorkbenchGridSlot } from '../types/game';
import type { BigNumberSource } from './bigNumber.ts';
import { lt } from './bigNumber.ts';

export const WORKBENCH_GRID_SIZE = 3;
export const WORKBENCH_SLOT_COUNT = 9;
export const STARTING_WORKBENCH_SLOT: WorkbenchGridSlot = 0;
export const FIRST_VERB_WORKBENCH_SLOT: WorkbenchGridSlot = 1;

export function createDefaultWorkbenchBoard(): WorkbenchBoard {
  return {
    unlockedSlots: [STARTING_WORKBENCH_SLOT],
    placements: {
      world: STARTING_WORKBENCH_SLOT,
    },
  };
}

export function isWorkbenchGridSlot(value: number): value is WorkbenchGridSlot {
  return Number.isInteger(value) && value >= 0 && value < WORKBENCH_SLOT_COUNT;
}

export function getSlotCenter(slot: WorkbenchGridSlot): { xPercent: number; yPercent: number } {
  return {
    xPercent: (slot % WORKBENCH_GRID_SIZE) * (100 / WORKBENCH_GRID_SIZE) + (100 / WORKBENCH_GRID_SIZE) / 2,
    yPercent: Math.floor(slot / WORKBENCH_GRID_SIZE) * (100 / WORKBENCH_GRID_SIZE) + (100 / WORKBENCH_GRID_SIZE) / 2,
  };
}

export function getNearestWorkbenchSlot(xPercent: number, yPercent: number): WorkbenchGridSlot {
  const col = Math.max(0, Math.min(2, Math.floor(xPercent / (100 / WORKBENCH_GRID_SIZE))));
  const row = Math.max(0, Math.min(2, Math.floor(yPercent / (100 / WORKBENCH_GRID_SIZE))));
  return (row * WORKBENCH_GRID_SIZE + col) as WorkbenchGridSlot;
}

export function normalizeWorkbenchBoard(board: WorkbenchBoard | undefined): WorkbenchBoard {
  if (!board) {
    return createDefaultWorkbenchBoard();
  }

  const unlockedSlots = Array.from(new Set([
    STARTING_WORKBENCH_SLOT,
    ...(board.unlockedSlots ?? []).filter(isWorkbenchGridSlot),
  ])).sort((a, b) => a - b) as WorkbenchGridSlot[];
  const placements: WorkbenchBoard['placements'] = {};

  for (const [wordId, slot] of Object.entries(board.placements ?? {}) as [WordId, WorkbenchGridSlot][]) {
    if (isWorkbenchGridSlot(slot) && unlockedSlots.includes(slot)) {
      placements[wordId] = slot;
    }
  }

  if (!Object.values(placements).includes(STARTING_WORKBENCH_SLOT)) {
    placements.world = STARTING_WORKBENCH_SLOT;
  }

  return {
    unlockedSlots,
    placements,
  };
}

export function unlockWorkbenchSlotsForProgress(board: WorkbenchBoard, meaning: BigNumberSource): WorkbenchBoard {
  if (lt(meaning, 100) || board.unlockedSlots.includes(FIRST_VERB_WORKBENCH_SLOT)) {
    return board;
  }

  return {
    ...board,
    unlockedSlots: [...board.unlockedSlots, FIRST_VERB_WORKBENCH_SLOT].sort((a, b) => a - b) as WorkbenchGridSlot[],
  };
}

export function migrateActiveWordsToWorkbenchBoard(
  board: WorkbenchBoard | undefined,
  activeNounId: WordId,
  activeVerbId: WordId | null,
): WorkbenchBoard {
  const nextBoard = normalizeWorkbenchBoard(board);
  const placements = { ...nextBoard.placements };

  if (!Object.prototype.hasOwnProperty.call(placements, activeNounId)) {
    placements[activeNounId] = STARTING_WORKBENCH_SLOT;
  }

  if (
    activeVerbId &&
    nextBoard.unlockedSlots.includes(FIRST_VERB_WORKBENCH_SLOT) &&
    !Object.prototype.hasOwnProperty.call(placements, activeVerbId)
  ) {
    placements[activeVerbId] = FIRST_VERB_WORKBENCH_SLOT;
  }

  return {
    ...nextBoard,
    placements,
  };
}

export function moveWorkbenchWordToSlot(
  board: WorkbenchBoard,
  wordId: WordId,
  targetSlot: WorkbenchGridSlot,
): { board: WorkbenchBoard; moved: boolean } {
  if (!board.unlockedSlots.includes(targetSlot)) {
    return { board, moved: false };
  }

  const currentSlot = board.placements[wordId];
  const occupyingWordId = (Object.entries(board.placements) as [WordId, WorkbenchGridSlot][])
    .find(([, slot]) => slot === targetSlot)?.[0] ?? null;
  const placements = { ...board.placements, [wordId]: targetSlot };

  if (occupyingWordId && occupyingWordId !== wordId && currentSlot !== undefined) {
    placements[occupyingWordId] = currentSlot;
  }

  return {
    board: {
      ...board,
      placements,
    },
    moved: true,
  };
}

export function placeWorkbenchWord(
  board: WorkbenchBoard,
  wordId: WordId,
  replacedWordId: WordId | null,
  fallbackSlot: WorkbenchGridSlot,
): WorkbenchBoard {
  const placements = { ...board.placements };
  const preferredSlot = replacedWordId ? placements[replacedWordId] : undefined;
  const targetSlot = preferredSlot ?? fallbackSlot;

  if (replacedWordId) {
    delete placements[replacedWordId];
  }

  if (!board.unlockedSlots.includes(targetSlot)) {
    return {
      ...board,
      placements,
    };
  }

  return {
    ...board,
    placements: {
      ...placements,
      [wordId]: targetSlot,
    },
  };
}

export function parseWorkbenchSentence(
  board: WorkbenchBoard,
  fallbackNounId: WordId,
): ParsedSentence {
  const orderedEntries = (Object.entries(board.placements) as [WordId, WorkbenchGridSlot][])
    .filter(([, slot]) => board.unlockedSlots.includes(slot))
    .sort(([, firstSlot], [, secondSlot]) => firstSlot - secondSlot);
  const orderedWordIds = orderedEntries.map(([wordId]) => wordId);
  const firstNounId = orderedWordIds.find((wordId) => getWordById(wordId).type === 'noun') ?? fallbackNounId;
  const firstVerbIndex = orderedWordIds.findIndex((wordId) => getWordById(wordId).type === 'verb');
  const nounAfterVerbId = firstVerbIndex >= 0
    ? orderedWordIds.slice(firstVerbIndex + 1).find((wordId) => getWordById(wordId).type === 'noun') ?? null
    : null;
  const effectiveVerbId = nounAfterVerbId
    ? orderedWordIds[firstVerbIndex]
    : null;
  const activeNounId = nounAfterVerbId ?? firstNounId;
  const sentenceText = orderedWordIds.map((wordId) => getWordById(wordId).text).join(' ');

  if (effectiveVerbId && nounAfterVerbId) {
    return {
      orderedWordIds,
      activeNounId,
      effectiveVerbId,
      sentenceText,
      feedback: `Sentence: ${getWordById(effectiveVerbId).text} ${getWordById(nounAfterVerbId).text}`,
    };
  }

  if (firstVerbIndex >= 0) {
    return {
      orderedWordIds,
      activeNounId,
      effectiveVerbId: null,
      sentenceText,
      feedback: orderedWordIds.length > 1
        ? 'Sentence inactive: place a verb before a noun.'
        : `${getWordById(orderedWordIds[firstVerbIndex]).text} waits for a word.`,
    };
  }

  return {
    orderedWordIds,
    activeNounId,
    effectiveVerbId: null,
    sentenceText,
    feedback: sentenceText || getWordById(fallbackNounId).text,
  };
}
