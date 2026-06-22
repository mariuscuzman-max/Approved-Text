import { useRef, useState } from 'react';
import type { MouseEvent, PointerEvent } from 'react';
import { getPathRibbonStyles, getPathThemeStyles, getWordById } from '../data/words';
import type {
  StampEffect,
  VisiblePathEvent,
  WheelRevealState,
  WordDefinition,
  SentenceModifierLink,
  WorkbenchBoard,
  WorkbenchGridSlot,
  WorkbenchTokenId,
} from '../types/game';
import { formatMeaning, formatRate } from '../utils/format';
import type { SentenceClauseProduction } from '../utils/sentenceProduction.ts';
import { isStampBlockedElement, shouldStampFromPointerInteraction } from '../utils/stampInput';
import { getActiveWordPowerLabel, getRootChargeLabel } from '../utils/upgrades';
import { getWordConnectionDisplay } from '../utils/sentenceConnections.ts';
import {
  WORKBENCH_BOARD_HEIGHT_PERCENT,
  WORKBENCH_GRID_COLUMNS,
  WORKBENCH_GRID_ROWS,
  WORKBENCH_SLOT_COUNT,
  getWorkbenchTokenWordId,
} from '../utils/workbench';

interface WordCardProps {
  verb: WordDefinition | null;
  adjective: WordDefinition | null;
  adjectiveFeedback: string | null;
  modifierLinks: SentenceModifierLink[];
  activeTokenIds: WorkbenchTokenId[];
  verbSlotUnlocked: boolean;
  manualStampCount: number;
  activeWordStartedAt: number;
  now: number;
  clauseProduction: SentenceClauseProduction[];
  visiblePathEvent: VisiblePathEvent | null;
  board: WorkbenchBoard;
  stamps: StampEffect[];
  onStamp: (x: number, y: number) => void;
  onPathEventClick: (event: VisiblePathEvent) => void;
  onFacedownTruthPick: (event: VisiblePathEvent, cardIndex: number) => void;
  wheelReveal: WheelRevealState | null;
  onWheelSpin: (event: VisiblePathEvent) => void;
  onUnavailableSlot: () => void;
  onMoveWord: (tokenId: WorkbenchTokenId, xPercent: number, yPercent: number) => void;
  onResetLayout: () => void;
}

interface DragState {
  tokenId: WorkbenchTokenId;
  startX: number;
  startY: number;
  offsetX: number;
  offsetY: number;
  moved: boolean;
}

interface DragPosition {
  tokenId: WorkbenchTokenId;
  x: number;
  y: number;
}

function getSlotStyle(slot: WorkbenchGridSlot) {
  const col = slot % WORKBENCH_GRID_COLUMNS;
  const row = Math.floor(slot / WORKBENCH_GRID_COLUMNS);
  const columnWidth = 100 / WORKBENCH_GRID_COLUMNS;
  const rowHeight = WORKBENCH_BOARD_HEIGHT_PERCENT / WORKBENCH_GRID_ROWS;

  return {
    left: `calc(${col * columnWidth + 3}% + 0.15rem)`,
    top: `calc(${row * rowHeight + 2.5}% + 0.15rem)`,
    width: 'calc(27.333% - 0.3rem)',
    height: 'calc(24% - 0.3rem)',
  };
}

function getCellCenterPercent(clientX: number, clientY: number, bounds: DOMRect) {
  return {
    xPercent: bounds.width > 0 ? ((clientX - bounds.left) / bounds.width) * 100 : 0,
    yPercent: bounds.height > 0 ? ((clientY - bounds.top) / bounds.height) * 100 : 0,
  };
}

function WorkbenchWordCard({
  word,
  tokenId,
  modifierLinks,
  activeTokenIds,
  manualStampCount,
  activeWordStartedAt,
  now,
  clauseProduction,
  dragPosition,
  slot,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: {
  word: WordDefinition;
  tokenId: WorkbenchTokenId;
  modifierLinks: SentenceModifierLink[];
  activeTokenIds: WorkbenchTokenId[];
  manualStampCount: number;
  activeWordStartedAt: number;
  now: number;
  clauseProduction: SentenceClauseProduction[];
  dragPosition: DragPosition | null;
  slot: WorkbenchGridSlot;
  onPointerDown: (event: PointerEvent<HTMLElement>, tokenId: WorkbenchTokenId) => void;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLElement>) => void;
}) {
  const isActiveToken = activeTokenIds.includes(tokenId);
  const linkedVerbId = modifierLinks.find((link) => (
    link.kind === 'verb' && link.targetNounId === word.id
  ))?.modifierWordId ?? null;
  const linkedVerb = linkedVerbId ? getWordById(linkedVerbId) : null;
  const powerLabel = getActiveWordPowerLabel(
    word,
    word.type === 'noun' ? linkedVerb : null,
    activeWordStartedAt,
    now,
  );
  const rootChargeLabel = isActiveToken && word.id === 'root' ? getRootChargeLabel(manualStampCount) : null;
  const connectionDisplay = getWordConnectionDisplay(modifierLinks, word.id);
  const nounProduction = clauseProduction.find((production) => production.nounId === word.id);
  const cardStyle = dragPosition?.tokenId === tokenId
    ? {
        left: dragPosition.x,
        top: dragPosition.y,
        width: 'calc(27.333% - 0.3rem)',
        height: 'calc(24% - 0.3rem)',
      }
    : getSlotStyle(slot);
  const connectionStyle = connectionDisplay
    ? {
        borderColor: connectionDisplay.color,
        boxShadow: `0 0 0 2px ${connectionDisplay.color}, 0 0 14px ${connectionDisplay.color}66`,
      }
    : {};

  return (
    <article
      className={`absolute z-[2] grid cursor-grab touch-none grid-rows-[auto_auto_auto_1fr] overflow-hidden rounded-md border-2 p-1.5 shadow-sm active:cursor-grabbing ${getPathThemeStyles(word.pathTheme)} ${
        isActiveToken ? '' : 'border-dashed grayscale opacity-50'
      }`}
      style={{ ...cardStyle, ...connectionStyle }}
      onPointerDown={(event) => onPointerDown(event, tokenId)}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="flex items-center justify-between gap-1 text-[0.55rem] font-black uppercase leading-none text-stone-500">
        <span>{word.type}</span>
        {connectionDisplay ? (
          <span className="truncate normal-case" style={{ color: connectionDisplay.color }}>
            {connectionDisplay.label}
          </span>
        ) : (
          <span className="text-[0.5rem] tracking-wide">{isActiveToken ? 'ACTIVE' : 'LOOSE'}</span>
        )}
      </div>
      <div className={`mt-1 h-1 rounded-full ${getPathRibbonStyles(word.pathTheme)}`} />
      <h3 className="min-w-0 whitespace-nowrap font-serif text-[clamp(0.7rem,3.2vw,0.95rem)] font-bold leading-5 text-[#27211a]">
        {word.text}
      </h3>
      <div className="mt-1 min-h-0 overflow-hidden text-[0.56rem] font-bold leading-3 text-[#27211a]">
        {isActiveToken && nounProduction ? (
          <>
            <div>Tap +{formatMeaning(nounProduction.tapGain)}</div>
            <div>Idle +{formatRate(nounProduction.passiveGain)}/s</div>
          </>
        ) : null}
        {isActiveToken && word.type === 'connector' ? (
          <>
            <div>Tap +{formatMeaning(word.tapValue)}</div>
            <div>Idle +{formatRate(word.passiveValue)}/s</div>
            <div className="mt-1 line-clamp-2">Power: total tap and idle +10%</div>
          </>
        ) : null}
        {!isActiveToken ? <div>Inactive in this order</div> : null}
        {isActiveToken && powerLabel ? <div className="mt-1 line-clamp-2">Power: {powerLabel}</div> : null}
        {rootChargeLabel ? <div className="mt-1">Root: {rootChargeLabel}</div> : null}
      </div>
    </article>
  );
}

function WordCard({
  verb,
  adjective,
  adjectiveFeedback,
  modifierLinks,
  activeTokenIds,
  verbSlotUnlocked,
  manualStampCount,
  activeWordStartedAt,
  now,
  clauseProduction,
  visiblePathEvent,
  board,
  stamps,
  onStamp,
  onPathEventClick,
  onFacedownTruthPick,
  wheelReveal,
  onWheelSpin,
  onUnavailableSlot,
  onMoveWord,
  onResetLayout,
}: WordCardProps) {
  const workbenchRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<DragState | null>(null);
  const [dragPosition, setDragPosition] = useState<DragPosition | null>(null);
  const cards = (Object.entries(board.placements) as [WorkbenchTokenId, WorkbenchGridSlot][])
    .map(([tokenId, slot]) => ({
      tokenId,
      slot,
      word: getWordById(getWorkbenchTokenWordId(tokenId)),
    }));
  const verbSlotOccupied = Object.values(board.placements).includes(1);

  const handlePointerStamp = (event: MouseEvent<HTMLDivElement>) => {
    if (isStampBlockedElement(event.target)) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    onStamp(event.clientX - bounds.left, event.clientY - bounds.top);
  };

  const stampAtClientPoint = (clientX: number, clientY: number) => {
    if (!workbenchRef.current) {
      return;
    }

    const bounds = workbenchRef.current.getBoundingClientRect();
    onStamp(clientX - bounds.left, clientY - bounds.top);
  };

  const handleCardPointerDown = (event: PointerEvent<HTMLElement>, tokenId: WorkbenchTokenId) => {
    const workbenchBounds = workbenchRef.current?.getBoundingClientRect();

    if (!workbenchBounds) {
      return;
    }

    const cardBounds = event.currentTarget.getBoundingClientRect();
    dragStateRef.current = {
      tokenId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX - cardBounds.left,
      offsetY: event.clientY - cardBounds.top,
      moved: false,
    };
    setDragPosition({
      tokenId,
      x: cardBounds.left - workbenchBounds.left,
      y: cardBounds.top - workbenchBounds.top,
    });
    event.currentTarget.setPointerCapture(event.pointerId);
    event.stopPropagation();
  };

  const handleCardPointerMove = (event: PointerEvent<HTMLElement>) => {
    const dragState = dragStateRef.current;
    const workbenchBounds = workbenchRef.current?.getBoundingClientRect();

    if (!dragState || !workbenchBounds) {
      return;
    }

    const moveDistance = Math.hypot(event.clientX - dragState.startX, event.clientY - dragState.startY);
    dragState.moved = dragState.moved || !shouldStampFromPointerInteraction({ movementDistance: moveDistance });

    const cardBounds = event.currentTarget.getBoundingClientRect();
    const nextX = Math.max(0, Math.min(workbenchBounds.width - cardBounds.width, event.clientX - workbenchBounds.left - dragState.offsetX));
    const nextY = Math.max(0, Math.min(workbenchBounds.height - cardBounds.height, event.clientY - workbenchBounds.top - dragState.offsetY));

    setDragPosition({
      tokenId: dragState.tokenId,
      x: nextX,
      y: nextY,
    });
    event.stopPropagation();
  };

  const handleCardPointerUp = (event: PointerEvent<HTMLElement>) => {
    const dragState = dragStateRef.current;
    const workbenchBounds = workbenchRef.current?.getBoundingClientRect();

    if (!dragState || !workbenchBounds) {
      return;
    }

    const moveDistance = Math.hypot(event.clientX - dragState.startX, event.clientY - dragState.startY);

    if (!shouldStampFromPointerInteraction({ movementDistance: moveDistance, dragWasActive: dragState.moved })) {
      const { xPercent, yPercent } = getCellCenterPercent(event.clientX, event.clientY, workbenchBounds);
      onMoveWord(dragState.tokenId, xPercent, yPercent);
    } else {
      stampAtClientPoint(event.clientX, event.clientY);
    }

    dragStateRef.current = null;
    setDragPosition(null);
    event.stopPropagation();
  };

  return (
    <section className="relative grid w-full grid-rows-[auto_auto] rounded-lg border border-[#d6bc92] bg-[#fffdf6] p-3 text-left shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase text-stone-500">Sentence Workbench</div>
          <div className="text-sm font-medium text-stone-500">Drag words into reading order.</div>
          <div className="mt-1 flex flex-wrap gap-2 text-[0.6rem] font-bold uppercase tracking-wide text-stone-400">
            <span>Solid: active</span>
            <span>Glow: connected</span>
            <span>Faded: loose</span>
          </div>
          {adjectiveFeedback ? (
            <div className="mt-1 text-xs font-bold text-[#6f4f24]">{adjectiveFeedback}</div>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded border border-[#decaa9] bg-[#fff7e8] px-2 py-1 text-xs font-bold text-stone-600">
            {board.unlockedSlots.length} / {WORKBENCH_SLOT_COUNT}
          </div>
          <button
            type="button"
            data-no-stamp="true"
            onClick={onResetLayout}
            className="min-h-8 rounded border border-stone-300 bg-white px-2 text-xs font-bold text-stone-500 shadow-sm active:translate-y-px"
          >
            Reset
          </button>
          <button
            type="button"
            data-no-stamp="true"
            onClick={onUnavailableSlot}
            className="grid h-8 w-8 place-items-center rounded border border-stone-300 bg-white text-base font-bold text-stone-500 shadow-sm active:translate-y-px"
            aria-label="Add word slot"
          >
            +
          </button>
        </div>
      </div>

      <div
        ref={workbenchRef}
        role="button"
        tabIndex={0}
        onClick={handlePointerStamp}
        className="relative mx-auto mt-3 aspect-square min-h-0 w-[min(92vw,620px)] max-w-full overflow-hidden rounded border border-dashed border-[#decaa9] bg-white/55 p-1 text-left outline-none transition active:scale-[0.997]"
      >
        <div
          className="absolute inset-x-1 top-1 grid grid-cols-3 grid-rows-2 gap-1"
          style={{ height: `calc(${WORKBENCH_BOARD_HEIGHT_PERCENT}% - 0.25rem)` }}
        >
          {Array.from({ length: WORKBENCH_SLOT_COUNT }, (_, index) => {
            const unlocked = board.unlockedSlots.includes(index as WorkbenchGridSlot);
            return (
              <div
                key={index}
                className={`rounded border text-center text-[0.58rem] font-bold ${
                  unlocked
                    ? 'border-[#e2cfad] bg-white/50 text-stone-300'
                    : 'border-[#ded4c2] bg-[#eee4d4]/60 text-stone-400'
                }`}
              >
                {unlocked ? index + 1 : 'LOCK'}
              </div>
            );
          })}
        </div>

        <div
          className="pointer-events-none absolute inset-x-3 bottom-3 grid place-items-center rounded-md border border-dashed border-[#d8c39f] bg-[#fffaf0]/75 text-center"
          style={{ top: `${WORKBENCH_BOARD_HEIGHT_PERCENT + 3}%` }}
        >
          <div>
            <div className="font-serif text-sm font-bold text-[#6f4f24]">Stamp Area</div>
            <div className="mt-1 text-[0.65rem] font-semibold text-stone-500">Tap here to stamp Meaning.</div>
          </div>
        </div>

        {cards.map(({ tokenId, word, slot }) => {
          if (!board.unlockedSlots.includes(slot)) {
            return null;
          }

          return (
            <WorkbenchWordCard
              key={tokenId}
              word={word}
              tokenId={tokenId}
              modifierLinks={modifierLinks}
              activeTokenIds={activeTokenIds}
              manualStampCount={manualStampCount}
              activeWordStartedAt={activeWordStartedAt}
              now={now}
              clauseProduction={clauseProduction}
              dragPosition={dragPosition}
              slot={slot}
              onPointerDown={handleCardPointerDown}
              onPointerMove={handleCardPointerMove}
              onPointerUp={handleCardPointerUp}
            />
          );
        })}

        {verbSlotUnlocked && !verb && !verbSlotOccupied ? (
          <div
            className="absolute grid place-items-center rounded-md border-2 border-dashed border-[#d8c8ad] bg-[#f3eadc]/70 p-2 text-center text-[0.65rem] font-bold text-stone-400"
            style={getSlotStyle(1)}
            onClick={(event) => event.stopPropagation()}
          >
            Select a verb
          </div>
        ) : null}

        {!verbSlotUnlocked && !verbSlotOccupied ? (
          <div
            className="absolute grid place-items-center rounded-md border-2 border-dashed border-[#d8c8ad] bg-[#f3eadc]/70 p-2 text-center text-[0.65rem] font-bold text-stone-400"
            style={getSlotStyle(1)}
            onClick={(event) => event.stopPropagation()}
          >
            Verb slot unlocks at 100 Meaning.
          </div>
        ) : null}

        {wheelReveal ? (
          <section
            data-no-stamp="true"
            className="absolute left-1/2 top-1/2 z-10 grid w-[min(82%,18rem)] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md border-2 border-[#8260a8] bg-[#fff7fb] p-4 text-center shadow-[0_10px_28px_rgba(73,45,93,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={`wheel-disc ${wheelReveal.status === 'spinning' ? 'wheel-disc-spinning' : ''}`}>
              <span>?</span>
            </div>
            <div className="mt-3 font-serif text-lg font-bold text-[#49335d]">
              {wheelReveal.status === 'spinning' ? 'The wheel is deciding...' : wheelReveal.resultLabel}
            </div>
          </section>
        ) : visiblePathEvent?.type === 'dream-facedown-truth' ? (
          <section
            data-no-stamp="true"
            className="absolute left-1/2 top-1/2 z-10 w-[min(90%,22rem)] -translate-x-1/2 -translate-y-1/2 rounded-md border-2 border-[#8260a8] bg-[#fff7fb] p-3 shadow-[0_10px_28px_rgba(73,45,93,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="text-center">
              <div className="font-serif text-lg font-bold text-[#49335d]">Facedown Truth</div>
              <div className="mt-1 text-xs font-semibold text-stone-500">Choose one card</div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((cardIndex) => (
                <button
                  key={cardIndex}
                  type="button"
                  data-no-stamp="true"
                  aria-label={`Choose facedown card ${cardIndex + 1}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    onFacedownTruthPick(visiblePathEvent, cardIndex);
                  }}
                  className="grid aspect-[2/3] min-h-24 place-items-center rounded border-2 border-[#6d4a9a] bg-[#e8dcf2] text-2xl font-black text-[#6d4a9a] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f1e9fb] active:translate-y-0"
                >
                  ?
                </button>
              ))}
            </div>
          </section>
        ) : visiblePathEvent?.type === 'dream-wheel-of-meaning' ? (
          <button
            type="button"
            data-no-stamp="true"
            onClick={(event) => {
              event.stopPropagation();
              onWheelSpin(visiblePathEvent);
            }}
            className="absolute left-1/2 top-1/2 z-10 grid w-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md border-2 border-[#8260a8] bg-[#fff7fb] p-3 text-center shadow-[0_10px_28px_rgba(73,45,93,0.28)] transition hover:bg-white active:scale-95"
          >
            <span className="wheel-disc wheel-disc-small"><span>?</span></span>
            <span className="mt-2 text-sm font-black text-[#49335d]">Wheel of Meaning</span>
            <span className="text-xs font-bold text-stone-500">Spin the wheel</span>
          </button>
        ) : visiblePathEvent ? (
          <button
            type="button"
            data-no-stamp="true"
            onClick={(event) => {
              event.stopPropagation();
              onPathEventClick(visiblePathEvent);
            }}
            className="absolute z-10 w-32 -translate-x-1/2 -translate-y-1/2 rounded border-2 border-[#8e2020] bg-[#fff7e8] px-3 py-2 text-left shadow-[0_8px_18px_rgba(91,32,24,0.22)] transition hover:bg-white active:scale-95"
            style={{ left: `${visiblePathEvent.xPercent}%`, top: `${visiblePathEvent.yPercent}%` }}
          >
            <div className="text-sm font-black text-[#8e2020]">{visiblePathEvent.name}</div>
            <div className="text-xs font-bold text-stone-600">{visiblePathEvent.prompt}</div>
          </button>
        ) : null}

        {stamps.map((stamp) => (
          <span
            key={stamp.id}
            className="stamp-effect pointer-events-none absolute"
            style={{ left: stamp.x, top: stamp.y }}
          >
            <span className="stamp-mark">{stamp.label ?? 'APPROVED'}</span>
            <span className="stamp-value">+{formatMeaning(stamp.value)}</span>
          </span>
        ))}
      </div>

    </section>
  );
}

export default WordCard;
