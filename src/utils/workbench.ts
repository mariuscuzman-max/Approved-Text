import { getWordById, words } from '../data/words.ts';
import type {
  ParsedSentence,
  SentenceModifierLink,
  SentenceNounClause,
  WordId,
  WorkbenchBoard,
  WorkbenchGridSlot,
  WorkbenchTokenId,
} from '../types/game';
import type { BigNumberSource } from './bigNumber.ts';
import { lt } from './bigNumber.ts';

export const WORKBENCH_GRID_COLUMNS = 3;
export const WORKBENCH_GRID_ROWS = 2;
export const WORKBENCH_SLOT_COUNT = 6;
export const WORKBENCH_BOARD_HEIGHT_PERCENT = 58;
export const STARTING_WORKBENCH_SLOT: WorkbenchGridSlot = 0;
export const FIRST_VERB_WORKBENCH_SLOT: WorkbenchGridSlot = 1;
export const THIRD_WORKBENCH_SLOT: WorkbenchGridSlot = 2;
export const FIRST_ADJECTIVE_WORKBENCH_SLOT: WorkbenchGridSlot = 2;

export function getWorkbenchTokenWordId(tokenId: WorkbenchTokenId): WordId {
  return tokenId.startsWith('and:') ? 'and' : tokenId as WordId;
}

export function isWorkbenchTokenId(value: string): value is WorkbenchTokenId {
  return /^and:[1-9]\d*$/.test(value) || words.some((word) => word.id === value);
}

export function getAndTokenId(copyNumber: number): WorkbenchTokenId {
  return `and:${Math.max(1, Math.floor(copyNumber))}`;
}

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
  const columnWidth = 100 / WORKBENCH_GRID_COLUMNS;
  const rowHeight = WORKBENCH_BOARD_HEIGHT_PERCENT / WORKBENCH_GRID_ROWS;

  return {
    xPercent: (slot % WORKBENCH_GRID_COLUMNS) * columnWidth + columnWidth / 2,
    yPercent: Math.floor(slot / WORKBENCH_GRID_COLUMNS) * rowHeight + rowHeight / 2,
  };
}

export function getNearestWorkbenchSlot(xPercent: number, yPercent: number): WorkbenchGridSlot {
  const col = Math.max(0, Math.min(
    WORKBENCH_GRID_COLUMNS - 1,
    Math.floor(xPercent / (100 / WORKBENCH_GRID_COLUMNS)),
  ));
  const row = Math.max(0, Math.min(
    WORKBENCH_GRID_ROWS - 1,
    Math.floor(yPercent / (WORKBENCH_BOARD_HEIGHT_PERCENT / WORKBENCH_GRID_ROWS)),
  ));
  return (row * WORKBENCH_GRID_COLUMNS + col) as WorkbenchGridSlot;
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

  for (const [tokenId, slot] of Object.entries(board.placements ?? {}) as [WorkbenchTokenId, WorkbenchGridSlot][]) {
    if (isWorkbenchGridSlot(slot) && unlockedSlots.includes(slot)) {
      placements[tokenId] = slot;
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
  const unlockedSlots = new Set(board.unlockedSlots);

  if (!lt(meaning, 100)) {
    unlockedSlots.add(FIRST_VERB_WORKBENCH_SLOT);
  }

  if (!lt(meaning, 500)) {
    unlockedSlots.add(THIRD_WORKBENCH_SLOT);
  }

  if (unlockedSlots.size === board.unlockedSlots.length) {
    return board;
  }

  return {
    ...board,
    unlockedSlots: Array.from(unlockedSlots).sort((a, b) => a - b) as WorkbenchGridSlot[],
  };
}

export function migrateActiveWordsToWorkbenchBoard(
  board: WorkbenchBoard | undefined,
  activeNounId: WordId,
  activeVerbId: WordId | null,
  activeAdjectiveId: WordId | null = null,
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

  if (
    activeAdjectiveId &&
    nextBoard.unlockedSlots.includes(FIRST_ADJECTIVE_WORKBENCH_SLOT) &&
    !Object.prototype.hasOwnProperty.call(placements, activeAdjectiveId)
  ) {
    placements[activeAdjectiveId] = FIRST_ADJECTIVE_WORKBENCH_SLOT;
  }

  return {
    ...nextBoard,
    placements,
  };
}

export function moveWorkbenchWordToSlot(
  board: WorkbenchBoard,
  tokenId: WorkbenchTokenId,
  targetSlot: WorkbenchGridSlot,
): { board: WorkbenchBoard; moved: boolean } {
  if (!board.unlockedSlots.includes(targetSlot)) {
    return { board, moved: false };
  }

  const currentSlot = board.placements[tokenId];
  const occupyingTokenId = (Object.entries(board.placements) as [WorkbenchTokenId, WorkbenchGridSlot][])
    .find(([, slot]) => slot === targetSlot)?.[0] ?? null;
  const placements: WorkbenchBoard['placements'] = { ...board.placements, [tokenId]: targetSlot };

  if (occupyingTokenId && occupyingTokenId !== tokenId && currentSlot !== undefined) {
    placements[occupyingTokenId] = currentSlot;
  }

  return {
    board: {
      ...board,
      placements,
    },
    moved: true,
  };
}

export function getFirstEmptyWorkbenchSlot(board: WorkbenchBoard): WorkbenchGridSlot | null {
  const occupiedSlots = new Set(Object.values(board.placements));
  return board.unlockedSlots.find((slot) => !occupiedSlots.has(slot)) ?? null;
}

export function placeOwnedAndConnector(
  board: WorkbenchBoard,
  andOwnedCount: number,
): { board: WorkbenchBoard; placed: boolean } {
  const emptySlot = getFirstEmptyWorkbenchSlot(board);

  if (emptySlot === null) {
    return { board, placed: false };
  }

  for (let copyNumber = 1; copyNumber <= andOwnedCount; copyNumber += 1) {
    const tokenId = getAndTokenId(copyNumber);

    if (!(tokenId in board.placements)) {
      return {
        board: {
          ...board,
          placements: {
            ...board.placements,
            [tokenId]: emptySlot,
          },
        },
        placed: true,
      };
    }
  }

  return { board, placed: false };
}

export function canPlaceAdditionalNoun(board: WorkbenchBoard): boolean {
  const placedWordIds = Object.keys(board.placements)
    .map((tokenId) => getWorkbenchTokenWordId(tokenId as WorkbenchTokenId));
  const nounCount = placedWordIds.filter((wordId) => getWordById(wordId).type === 'noun').length;
  const connectorCount = placedWordIds.filter((wordId) => wordId === 'and').length;

  return connectorCount >= nounCount && getFirstEmptyWorkbenchSlot(board) !== null;
}

export function placeAdditionalNoun(
  board: WorkbenchBoard,
  wordId: WordId,
): { board: WorkbenchBoard; placed: boolean } {
  const emptySlot = getFirstEmptyWorkbenchSlot(board);

  if (
    emptySlot === null ||
    wordId in board.placements ||
    !canPlaceAdditionalNoun(board)
  ) {
    return { board, placed: false };
  }

  return {
    board: {
      ...board,
      placements: {
        ...board.placements,
        [wordId]: emptySlot,
      },
    },
    placed: true,
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
  const orderedEntries = (Object.entries(board.placements) as [WorkbenchTokenId, WorkbenchGridSlot][])
    .filter(([, slot]) => board.unlockedSlots.includes(slot))
    .sort(([, firstSlot], [, secondSlot]) => firstSlot - secondSlot);
  const orderedWordIds = orderedEntries.map(([tokenId]) => getWorkbenchTokenWordId(tokenId));
  const sentenceText = orderedWordIds.map((wordId) => getWordById(wordId).text).join(' ');
  const segments: WordId[][] = [[]];
  const segmentTokenIds: WorkbenchTokenId[][] = [[]];
  const connectorTokenBeforeSegment: (WorkbenchTokenId | null)[] = [null];

  for (const [tokenId] of orderedEntries) {
    const wordId = getWorkbenchTokenWordId(tokenId);

    if (wordId === 'and') {
      segments.push([]);
      segmentTokenIds.push([]);
      connectorTokenBeforeSegment.push(tokenId);
    } else {
      segments[segments.length - 1].push(wordId);
      segmentTokenIds[segmentTokenIds.length - 1].push(tokenId);
    }
  }

  const parsedSegments = segments.map((segment): SentenceNounClause | null => {
    const nounIndex = segment.findIndex((wordId) => getWordById(wordId).type === 'noun');

    if (nounIndex < 0) {
      return null;
    }

    const wordsBeforeNoun = segment.slice(0, nounIndex);
    const verbId = wordsBeforeNoun.find((wordId) => getWordById(wordId).type === 'verb') ?? null;
    const adjectiveId = wordsBeforeNoun.find((wordId) => getWordById(wordId).type === 'adjective') ?? null;

    return {
      nounId: segment[nounIndex],
      effectiveVerbId: verbId,
      effectiveAdjectiveId: adjectiveId,
    };
  });
  const firstValidSegmentIndex = parsedSegments.findIndex(Boolean);
  const nounClauses: SentenceNounClause[] = [];
  const activeSegmentIndexes: number[] = [];

  if (firstValidSegmentIndex >= 0) {
    nounClauses.push(parsedSegments[firstValidSegmentIndex] as SentenceNounClause);
    activeSegmentIndexes.push(firstValidSegmentIndex);

    for (let index = firstValidSegmentIndex + 1; index < parsedSegments.length; index += 1) {
      const clause = parsedSegments[index];

      if (!clause) {
        break;
      }

      nounClauses.push(clause);
      activeSegmentIndexes.push(index);
    }
  }

  const primaryClause = nounClauses[0] ?? {
    nounId: fallbackNounId,
    effectiveVerbId: null,
    effectiveAdjectiveId: null,
  };
  const modifierLinks: SentenceModifierLink[] = nounClauses.flatMap((clause) => {
    const links: SentenceModifierLink[] = [];

    if (clause.effectiveVerbId) {
      links.push({
        modifierWordId: clause.effectiveVerbId,
        targetNounId: clause.nounId,
        kind: 'verb',
      });
    }

    if (clause.effectiveAdjectiveId) {
      links.push({
        modifierWordId: clause.effectiveAdjectiveId,
        targetNounId: clause.nounId,
        kind: 'adjective',
      });
    }

    return links;
  });
  const activeConnectorCount = Math.max(0, nounClauses.length - 1);
  const activeTokenIdSet = new Set<WorkbenchTokenId>();

  activeSegmentIndexes.forEach((segmentIndex, activeIndex) => {
    const clause = parsedSegments[segmentIndex] as SentenceNounClause;
    const segmentWords = segments[segmentIndex];
    const tokens = segmentTokenIds[segmentIndex];
    const nounTokenIndex = segmentWords.findIndex((wordId) => wordId === clause.nounId);

    if (nounTokenIndex >= 0) {
      activeTokenIdSet.add(tokens[nounTokenIndex]);
    }

    for (const modifierWordId of [clause.effectiveVerbId, clause.effectiveAdjectiveId]) {
      if (!modifierWordId) {
        continue;
      }

      const modifierTokenIndex = segmentWords.findIndex((wordId) => wordId === modifierWordId);

      if (modifierTokenIndex >= 0) {
        activeTokenIdSet.add(tokens[modifierTokenIndex]);
      }
    }

    if (activeIndex > 0) {
      const connectorTokenId = connectorTokenBeforeSegment[segmentIndex];

      if (connectorTokenId) {
        activeTokenIdSet.add(connectorTokenId);
      }
    }
  });
  const activeTokenIds = orderedEntries
    .map(([tokenId]) => tokenId)
    .filter((tokenId) => activeTokenIdSet.has(tokenId));
  const looseTokenIds = orderedEntries
    .map(([tokenId]) => tokenId)
    .filter((tokenId) => !activeTokenIdSet.has(tokenId));
  const firstVerbId = orderedWordIds.find((wordId) => getWordById(wordId).type === 'verb') ?? null;
  let feedback = sentenceText || getWordById(fallbackNounId).text;

  if (activeConnectorCount > 0) {
    feedback = `Active sentence: ${sentenceText}`;
  } else if (primaryClause.effectiveAdjectiveId) {
    feedback = `${getWordById(primaryClause.effectiveAdjectiveId).text} modifies ${getWordById(primaryClause.nounId).text}.`;
  } else if (primaryClause.effectiveVerbId) {
    feedback = `Sentence: ${getWordById(primaryClause.effectiveVerbId).text} ${getWordById(primaryClause.nounId).text}`;
  } else if (firstVerbId) {
    feedback = orderedWordIds.length > 1
      ? 'Sentence inactive: place a verb before a noun.'
      : `${getWordById(firstVerbId).text} waits for a word.`;
  }

  return {
    orderedWordIds,
    activeTokenIds,
    looseTokenIds,
    nounClauses,
    modifierLinks,
    activeConnectorCount,
    activeNounId: primaryClause.nounId,
    effectiveVerbId: primaryClause.effectiveVerbId,
    effectiveAdjectiveId: primaryClause.effectiveAdjectiveId,
    sentenceText,
    feedback,
  };
}
