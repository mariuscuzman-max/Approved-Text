import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getUnlockChoices, getUnlockedWords, getWordById } from './data/words';
import type {
  ActivePathEvent,
  AppTab,
  GameState,
  SessionStats,
  StampEffect,
  VisiblePathEvent,
  WordId,
  WorkbenchGridSlot,
} from './types/game';
import { loadGameState, resetGameState, saveGameState } from './utils/storage';
import { formatMeaning, formatRate } from './utils/format';
import { add, eq, lt, lte, mul, sub } from './utils/bigNumber.ts';
import ResourceBar from './components/ResourceBar';
import WordCard from './components/WordCard';
import PathChoicePanel from './components/PathChoicePanel';
import DictionaryScreen from './components/DictionaryScreen';
import WordUpgradesMessage from './components/WordUpgradesMessage';
import PathBlock from './components/PathBlock';
import QuoteFeed from './components/QuoteFeed';
import StatsScreen from './components/StatsScreen';
import { createDefaultState, mergeSavedState } from './utils/gameState';
import { getHundredMeaningUnlockWordIds } from './utils/milestones';
import { canTriggerDreamUnlock, unlockDreamLayer } from './utils/dream';
import {
  getActiveWordTapMultiplier,
  getPassiveGain,
  getTapGain,
  getEffectiveFilingUpgradeCost,
  getEffectiveStampUpgradeCost,
  getUpgradeMilestoneMultiplier,
} from './utils/upgrades';
import {
  createActivePathEvent,
  createVisiblePathEvent,
  getActivePathEventSecondsRemaining,
  getEventSpawnMultiplier,
  getFarmEventTapMultiplier,
  getFlowEventIdleMultiplier,
  getMeaningBloomGain,
  getNextPathEventDelayMs,
  getRandomVisibleEventType,
  getSoftenedRulesUpgradeCostMultiplier,
} from './utils/pathEvents';
import {
  FIRST_VERB_WORKBENCH_SLOT,
  STARTING_WORKBENCH_SLOT,
  getNearestWorkbenchSlot,
  moveWorkbenchWordToSlot,
  parseWorkbenchSentence,
  placeWorkbenchWord,
  unlockWorkbenchSlotsForProgress,
} from './utils/workbench';
import { FIRST_CHOICE_COST, isFirstPathChoiceUnlocked } from './utils/progression.ts';
import {
  createDefaultSessionStats,
  recordEventClaim,
  recordEventSpawn,
  recordPassiveGain,
  recordTap,
  recordUpgradePurchase,
} from './utils/stats.ts';
import {
  getStreamDrizzleGain,
  isStreamDrizzleActive,
  STREAM_DRIZZLE_INTERVAL_SECONDS,
} from './utils/stream.ts';

const TEN_MEANING_MILESTONE = 10;
const TWENTY_FIVE_MEANING_MILESTONE = 25;
const FIFTY_MEANING_MILESTONE = 50;
const HUNDRED_MEANING_MILESTONE = 100;
const PASSIVE_TICK_MS = 1000;
const STAMP_LIFETIME_MS = 850;
const IS_DEV_MODE = import.meta.env.DEV;

function App() {
  const [gameState, setGameState] = useState<GameState>(() => mergeSavedState(loadGameState()));
  const [activeTab, setActiveTab] = useState<AppTab>('main');
  const [sessionStats, setSessionStats] = useState<SessionStats>(() => createDefaultSessionStats());
  const [stamps, setStamps] = useState<StampEffect[]>([]);
  const [, setNotice] = useState('Tap World to stamp Meaning into the record.');
  const [visiblePathEvent, setVisiblePathEvent] = useState<VisiblePathEvent | null>(null);
  const [activePathEvent, setActivePathEvent] = useState<ActivePathEvent | null>(null);
  const [dreamPromptDismissed, setDreamPromptDismissed] = useState(false);
  const [now, setNow] = useState(Date.now());
  const nextEventTimerRef = useRef<number | null>(null);
  const visibleEventTimerRef = useRef<number | null>(null);
  const lastPlayTimeUpdateRef = useRef(Date.now());

  const activeNoun = useMemo(() => getWordById(gameState.activeNounId), [gameState.activeNounId]);
  const activeVerb = useMemo(
    () => (gameState.activeVerbId ? getWordById(gameState.activeVerbId) : null),
    [gameState.activeVerbId],
  );
  const parsedSentence = useMemo(
    () => parseWorkbenchSentence(gameState.workbenchBoard, gameState.activeNounId),
    [gameState.activeNounId, gameState.workbenchBoard],
  );
  const effectiveVerb = useMemo(
    () => (parsedSentence.effectiveVerbId ? getWordById(parsedSentence.effectiveVerbId) : null),
    [parsedSentence.effectiveVerbId],
  );
  const effectiveNoun = useMemo(
    () => getWordById(parsedSentence.activeNounId),
    [parsedSentence.activeNounId],
  );
  const verbSlotUnlocked = gameState.unlockedWordIds.includes('understand');
  const unlockedWords = useMemo(
    () => getUnlockedWords(gameState.unlockedWordIds),
    [gameState.unlockedWordIds],
  );
  const unlockChoices = useMemo(
    () => getUnlockChoices(gameState.chosenFirstPath),
    [gameState.chosenFirstPath],
  );
  const activeEventSecondsRemaining = getActivePathEventSecondsRemaining(activePathEvent, now);
  const farmEventTapMultiplier = getFarmEventTapMultiplier(activePathEvent);
  const flowEventIdleMultiplier = getFlowEventIdleMultiplier(activePathEvent, gameState.filingUpgradeLevel);
  const softenedRulesCostMultiplier = getSoftenedRulesUpgradeCostMultiplier(activePathEvent);
  const currentTapGain = mul(
    getTapGain(effectiveNoun, gameState.stampUpgradeLevel, effectiveVerb),
    farmEventTapMultiplier,
  );
  const currentPassiveGain = mul(
    getPassiveGain(
      effectiveNoun,
      gameState.filingUpgradeLevel,
      gameState.activeWordStartedAt,
      now,
      effectiveVerb,
    ),
    flowEventIdleMultiplier,
  );
  const currentPassiveGainRef = useRef(currentPassiveGain);
  const activeEventLabel = activePathEvent && activeEventSecondsRemaining > 0
    ? `${activePathEvent.name}: ${activeEventSecondsRemaining}s`
    : null;
  const canShowDreamPrompt =
    canTriggerDreamUnlock(gameState.meaning, effectiveNoun, effectiveVerb, gameState.dreamUnlocked) &&
    !dreamPromptDismissed;
  const currentMilestone = (() => {
    if (!gameState.chosenFirstPath) {
      return `Choose Farm or Water at ${formatMeaning(FIRST_CHOICE_COST)} Meaning.`;
    }

    if (!gameState.tenMeaningMilestoneGranted) {
      return `Next milestone: new path word at ${formatMeaning(TEN_MEANING_MILESTONE)} Meaning.`;
    }

    if (!gameState.twentyFiveMeaningMilestoneGranted) {
      return `Next milestone: new path word at ${formatMeaning(TWENTY_FIVE_MEANING_MILESTONE)} Meaning.`;
    }

    if (!gameState.fiftyMeaningMilestoneGranted) {
      return `Next milestone: new path word at ${formatMeaning(FIFTY_MEANING_MILESTONE)} Meaning.`;
    }

    if (!gameState.hundredMeaningMilestoneGranted) {
      return `Next milestone: path verb at ${formatMeaning(HUNDRED_MEANING_MILESTONE)} Meaning.`;
    }

    return 'Next milestone: Dream path and stronger sentence tools coming soon.';
  })();

  useEffect(() => {
    const lastSavedAt = Date.now();
    const nextState = { ...gameState, lastSavedAt };

    saveGameState(nextState);
    setGameState((current) => ({ ...current, lastSavedAt }));
  }, [
    gameState.meaning,
    gameState.activeNounId,
    gameState.activeVerbId,
    gameState.activeWordId,
    gameState.unlockedWordIds,
    gameState.chosenFirstPath,
    gameState.passiveMeaningPerSecond,
    gameState.tenMeaningMilestoneGranted,
    gameState.twentyFiveMeaningMilestoneGranted,
    gameState.fiftyMeaningMilestoneGranted,
    gameState.hundredMeaningMilestoneGranted,
    gameState.manualStampCount,
    gameState.activeWordStartedAt,
    gameState.stampUpgradeLevel,
    gameState.filingUpgradeLevel,
    gameState.workbenchLayout,
    gameState.workbenchBoard,
    gameState.dreamUnlocked,
    gameState.totalMeaningEarned,
    gameState.stats,
  ]);

  const clearPathEventTimers = useCallback(() => {
    if (nextEventTimerRef.current) {
      window.clearTimeout(nextEventTimerRef.current);
      nextEventTimerRef.current = null;
    }

    if (visibleEventTimerRef.current) {
      window.clearTimeout(visibleEventTimerRef.current);
      visibleEventTimerRef.current = null;
    }
  }, []);

  const scheduleNextPathEvent = useCallback((
    chosenFirstPath: WordId | null,
    dreamUnlocked: boolean,
    activeWordForSchedule = effectiveNoun,
    effectiveVerbForSchedule = effectiveVerb,
  ) => {
    const eventType = getRandomVisibleEventType(chosenFirstPath, dreamUnlocked);

    if (!eventType) {
      return;
    }

    if (nextEventTimerRef.current) {
      window.clearTimeout(nextEventTimerRef.current);
    }

    nextEventTimerRef.current = window.setTimeout(() => {
      setVisiblePathEvent(createVisiblePathEvent(eventType));
      setGameState((current) => ({ ...current, stats: recordEventSpawn(current.stats) }));
      setSessionStats((current) => recordEventSpawn(current));
      nextEventTimerRef.current = null;
    }, getNextPathEventDelayMs(getEventSpawnMultiplier(activeWordForSchedule, effectiveVerbForSchedule)));
  }, [effectiveNoun, effectiveVerb]);

  useEffect(() => {
    clearPathEventTimers();
    setVisiblePathEvent(null);
    setActivePathEvent(null);
    scheduleNextPathEvent(gameState.chosenFirstPath, gameState.dreamUnlocked, effectiveNoun);

    return clearPathEventTimers;
  }, [
    clearPathEventTimers,
    effectiveNoun,
    gameState.chosenFirstPath,
    gameState.dreamUnlocked,
    scheduleNextPathEvent,
  ]);

  useEffect(() => {
    if (!visiblePathEvent) {
      return;
    }

    if (visibleEventTimerRef.current) {
      window.clearTimeout(visibleEventTimerRef.current);
    }

    visibleEventTimerRef.current = window.setTimeout(() => {
      setVisiblePathEvent(null);
      scheduleNextPathEvent(gameState.chosenFirstPath, gameState.dreamUnlocked, effectiveNoun);
      visibleEventTimerRef.current = null;
    }, Math.max(0, visiblePathEvent.expiresAt - Date.now()));

    return () => {
      if (visibleEventTimerRef.current) {
        window.clearTimeout(visibleEventTimerRef.current);
        visibleEventTimerRef.current = null;
      }
    };
  }, [
    effectiveNoun,
    gameState.chosenFirstPath,
    gameState.dreamUnlocked,
    scheduleNextPathEvent,
    visiblePathEvent,
  ]);

  useEffect(() => {
    setDreamPromptDismissed(false);
  }, [
    gameState.activeNounId,
    gameState.activeVerbId,
    gameState.workbenchBoard,
  ]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 500);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const timestamp = Date.now();
      const elapsedMs = Math.max(0, timestamp - lastPlayTimeUpdateRef.current);
      lastPlayTimeUpdateRef.current = timestamp;

      setGameState((current) => ({
        ...current,
        stats: {
          ...current.stats,
          totalPlayTimeMs: current.stats.totalPlayTimeMs + elapsedMs,
        },
      }));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const nextWorkbenchBoard = unlockWorkbenchSlotsForProgress(gameState.workbenchBoard, gameState.meaning);

    if (nextWorkbenchBoard === gameState.workbenchBoard) {
      return;
    }

    setGameState((current) => ({
      ...current,
      workbenchBoard: unlockWorkbenchSlotsForProgress(current.workbenchBoard, current.meaning),
    }));
  }, [
    gameState.meaning,
    gameState.workbenchBoard,
  ]);

  useEffect(() => {
    if (!activePathEvent || activePathEvent.endsAt > now) {
      return;
    }

    setActivePathEvent(null);
  }, [
    activePathEvent,
    now,
  ]);

  useEffect(() => {
    const nextPassiveMeaningPerSecond = currentPassiveGain;

    if (eq(gameState.passiveMeaningPerSecond, nextPassiveMeaningPerSecond)) {
      return;
    }

    setGameState((current) => ({
      ...current,
      passiveMeaningPerSecond: nextPassiveMeaningPerSecond,
    }));
  }, [
    effectiveNoun,
    effectiveVerb,
    currentPassiveGain,
    gameState.activeWordStartedAt,
    gameState.filingUpgradeLevel,
    gameState.passiveMeaningPerSecond,
  ]);

  useEffect(() => {
    currentPassiveGainRef.current = currentPassiveGain;
  }, [currentPassiveGain]);

  useEffect(() => {
    if (!isStreamDrizzleActive(effectiveNoun)) {
      return;
    }

    const timer = window.setInterval(() => {
      const passiveRate = currentPassiveGainRef.current;
      const streamGain = getStreamDrizzleGain(passiveRate, effectiveNoun, effectiveVerb);

      if (lte(streamGain, 0)) {
        return;
      }

      setGameState((current) => ({
        ...current,
        meaning: add(current.meaning, streamGain),
        totalMeaningEarned: add(current.totalMeaningEarned, streamGain),
        stats: recordPassiveGain(current.stats, streamGain, passiveRate),
      }));
      setSessionStats((current) => recordPassiveGain(current, streamGain, passiveRate));
      setNotice(`Stream: +${formatMeaning(streamGain)} Meaning`);

      const feedbackId = Date.now() + Math.random();
      setStamps((current) => [
        ...current,
        {
          id: feedbackId,
          x: '50%',
          y: '50%',
          value: streamGain,
          label: 'STREAM',
        },
      ]);
      window.setTimeout(() => {
        setStamps((current) => current.filter((stamp) => stamp.id !== feedbackId));
      }, STAMP_LIFETIME_MS);
    }, STREAM_DRIZZLE_INTERVAL_SECONDS * 1000);

    return () => window.clearInterval(timer);
  }, [effectiveNoun, effectiveVerb]);

  useEffect(() => {
    if (
      !gameState.chosenFirstPath ||
      gameState.tenMeaningMilestoneGranted ||
      lt(gameState.meaning, TEN_MEANING_MILESTONE)
    ) {
      return;
    }

    const milestoneWordId: WordId = gameState.chosenFirstPath === 'farm' ? 'seed' : 'rain';
    const milestoneWord = getWordById(milestoneWordId);

    setGameState((current) => {
      if (
        current.tenMeaningMilestoneGranted ||
        !current.chosenFirstPath ||
        lt(current.meaning, TEN_MEANING_MILESTONE)
      ) {
        return current;
      }

      return {
        ...current,
        unlockedWordIds: current.unlockedWordIds.includes(milestoneWordId)
          ? current.unlockedWordIds
          : [...current.unlockedWordIds, milestoneWordId],
        tenMeaningMilestoneGranted: true,
      };
    });
    setNotice(`New word acquired: ${milestoneWord.text}`);
  }, [
    gameState.chosenFirstPath,
    gameState.meaning,
    gameState.tenMeaningMilestoneGranted,
  ]);

  useEffect(() => {
    if (
      !gameState.chosenFirstPath ||
      !gameState.tenMeaningMilestoneGranted ||
      gameState.twentyFiveMeaningMilestoneGranted ||
      lt(gameState.meaning, TWENTY_FIVE_MEANING_MILESTONE)
    ) {
      return;
    }

    const milestoneWordId: WordId = gameState.chosenFirstPath === 'farm' ? 'soil' : 'stream';
    const milestoneWord = getWordById(milestoneWordId);

    setGameState((current) => {
      if (
        !current.chosenFirstPath ||
        !current.tenMeaningMilestoneGranted ||
        current.twentyFiveMeaningMilestoneGranted ||
        lt(current.meaning, TWENTY_FIVE_MEANING_MILESTONE)
      ) {
        return current;
      }

      return {
        ...current,
        unlockedWordIds: current.unlockedWordIds.includes(milestoneWordId)
          ? current.unlockedWordIds
          : [...current.unlockedWordIds, milestoneWordId],
        twentyFiveMeaningMilestoneGranted: true,
      };
    });
    setNotice(`New word acquired: ${milestoneWord.text}`);
  }, [
    gameState.chosenFirstPath,
    gameState.meaning,
    gameState.tenMeaningMilestoneGranted,
    gameState.twentyFiveMeaningMilestoneGranted,
  ]);

  useEffect(() => {
    if (
      !gameState.chosenFirstPath ||
      !gameState.twentyFiveMeaningMilestoneGranted ||
      gameState.fiftyMeaningMilestoneGranted ||
      lt(gameState.meaning, FIFTY_MEANING_MILESTONE)
    ) {
      return;
    }

    const milestoneWordId: WordId = gameState.chosenFirstPath === 'farm' ? 'root' : 'river';
    const milestoneWord = getWordById(milestoneWordId);

    setGameState((current) => {
      if (
        !current.chosenFirstPath ||
        !current.twentyFiveMeaningMilestoneGranted ||
        current.fiftyMeaningMilestoneGranted ||
        lt(current.meaning, FIFTY_MEANING_MILESTONE)
      ) {
        return current;
      }

      return {
        ...current,
        unlockedWordIds: current.unlockedWordIds.includes(milestoneWordId)
          ? current.unlockedWordIds
          : [...current.unlockedWordIds, milestoneWordId],
        fiftyMeaningMilestoneGranted: true,
      };
    });
    setNotice(`New word acquired: ${milestoneWord.text}`);
  }, [
    gameState.chosenFirstPath,
    gameState.fiftyMeaningMilestoneGranted,
    gameState.meaning,
    gameState.twentyFiveMeaningMilestoneGranted,
  ]);

  useEffect(() => {
    if (
      !gameState.chosenFirstPath ||
      !gameState.fiftyMeaningMilestoneGranted ||
      gameState.hundredMeaningMilestoneGranted ||
      lt(gameState.meaning, HUNDRED_MEANING_MILESTONE)
    ) {
      return;
    }

    const pathWordId: WordId = gameState.chosenFirstPath === 'farm' ? 'grow' : 'flow';
    const pathWord = getWordById(pathWordId);
    const understandWord = getWordById('understand');

    setGameState((current) => {
      if (
        !current.chosenFirstPath ||
        !current.fiftyMeaningMilestoneGranted ||
        current.hundredMeaningMilestoneGranted ||
        lt(current.meaning, HUNDRED_MEANING_MILESTONE)
      ) {
        return current;
      }

      const wordsToUnlock = getHundredMeaningUnlockWordIds(current.chosenFirstPath);

      return {
        ...current,
        unlockedWordIds: Array.from(new Set<WordId>([
          ...current.unlockedWordIds,
          ...wordsToUnlock,
        ])),
        hundredMeaningMilestoneGranted: true,
      };
    });
    setNotice(`New words acquired: ${pathWord.text} and ${understandWord.text}`);
  }, [
    gameState.chosenFirstPath,
    gameState.fiftyMeaningMilestoneGranted,
    gameState.hundredMeaningMilestoneGranted,
    gameState.meaning,
  ]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const passiveGain = mul(
        getPassiveGain(
          effectiveNoun,
          gameState.filingUpgradeLevel,
          gameState.activeWordStartedAt,
          Date.now(),
          effectiveVerb,
        ),
        getFlowEventIdleMultiplier(activePathEvent, gameState.filingUpgradeLevel),
      );

      if (lte(passiveGain, 0)) {
        return;
      }

      setGameState((current) => ({
        ...current,
        meaning: add(current.meaning, passiveGain),
        totalMeaningEarned: add(current.totalMeaningEarned, passiveGain),
        passiveMeaningPerSecond: passiveGain,
        stats: recordPassiveGain(current.stats, passiveGain, passiveGain),
      }));
      setSessionStats((current) => recordPassiveGain(current, passiveGain, passiveGain));
    }, PASSIVE_TICK_MS);

    return () => window.clearInterval(timer);
  }, [
    activePathEvent,
    effectiveNoun,
    effectiveVerb,
    gameState.activeWordStartedAt,
    gameState.filingUpgradeLevel,
  ]);

  const handleStamp = (x: number, y: number) => {
    const stampId = Date.now() + Math.random();
    const nextManualStampCount = gameState.manualStampCount + 1;
    const activeWordTapMultiplier = getActiveWordTapMultiplier(effectiveNoun, nextManualStampCount, effectiveVerb);
    const stampedValue = mul(currentTapGain, activeWordTapMultiplier);
    const stampedLabel = activeWordTapMultiplier > 1
      ? `Root bonus: +${formatMeaning(stampedValue)} Meaning`
      : `${effectiveNoun.text} stamped: +${formatMeaning(stampedValue)} Meaning`;

    setGameState((current) => {
      const currentParsedSentence = parseWorkbenchSentence(current.workbenchBoard, current.activeNounId);
      const currentActiveWord = getWordById(currentParsedSentence.activeNounId);
      const currentActiveVerb = currentParsedSentence.effectiveVerbId
        ? getWordById(currentParsedSentence.effectiveVerbId)
        : null;
      const nextCurrentManualStampCount = current.manualStampCount + 1;
      const baseTapGain = mul(
        getTapGain(currentActiveWord, current.stampUpgradeLevel, currentActiveVerb),
        getFarmEventTapMultiplier(activePathEvent),
      );
      const currentActiveWordTapMultiplier = getActiveWordTapMultiplier(
        currentActiveWord,
        nextCurrentManualStampCount,
        currentActiveVerb,
      );
      const tapGain = mul(baseTapGain, currentActiveWordTapMultiplier);

      return {
        ...current,
        meaning: add(current.meaning, tapGain),
        totalMeaningEarned: add(current.totalMeaningEarned, tapGain),
        activeWordId: currentActiveWord.id,
        activeNounId: currentActiveWord.id,
        manualStampCount: nextCurrentManualStampCount,
        stats: recordTap(current.stats, tapGain),
      };
    });
    setSessionStats((current) => recordTap(current, stampedValue));
    setNotice(stampedLabel);
    setStamps((current) => [
      ...current,
      {
        id: stampId,
        x,
        y,
        value: stampedValue,
      },
    ]);

    window.setTimeout(() => {
      setStamps((current) => current.filter((stamp) => stamp.id !== stampId));
    }, STAMP_LIFETIME_MS);
  };

  const handleChooseWord = (wordId: WordId) => {
    const word = getWordById(wordId);

    setGameState((current) => {
      if (current.chosenFirstPath || !isFirstPathChoiceUnlocked(current.meaning) || word.id === 'world') {
        return current;
      }

      return {
        ...current,
        meaning: sub(current.meaning, word.unlockCost),
        activeNounId: word.id,
        activeWordId: word.id,
        unlockedWordIds: [...current.unlockedWordIds, word.id],
        chosenFirstPath: word.id,
        workbenchBoard: placeWorkbenchWord(current.workbenchBoard, word.id, current.activeNounId, STARTING_WORKBENCH_SLOT),
        activeWordStartedAt: Date.now(),
        passiveMeaningPerSecond: getPassiveGain(word, current.filingUpgradeLevel, Date.now(), Date.now(), null),
      };
    });
    setNotice(`${word.text} approved as the next word.`);
  };

  const handleSelectWord = (wordId: WordId) => {
    if (!gameState.unlockedWordIds.includes(wordId)) {
      return;
    }

    const word = getWordById(wordId);

    if (word.type === 'verb') {
      setGameState((current) => {
        const nextWorkbenchBoard = placeWorkbenchWord(
          current.workbenchBoard,
          wordId,
          current.activeVerbId,
          FIRST_VERB_WORKBENCH_SLOT,
        );
        const nextSentence = parseWorkbenchSentence(nextWorkbenchBoard, current.activeNounId);
        const nextNoun = getWordById(nextSentence.activeNounId);
        const nextVerb = nextSentence.effectiveVerbId ? getWordById(nextSentence.effectiveVerbId) : null;

        return {
          ...current,
          activeVerbId: wordId,
          activeNounId: nextNoun.id,
          activeWordId: nextNoun.id,
          workbenchBoard: nextWorkbenchBoard,
          passiveMeaningPerSecond: getPassiveGain(
            nextNoun,
            current.filingUpgradeLevel,
            current.activeWordStartedAt,
            Date.now(),
            nextVerb,
          ),
        };
      });
      setActiveTab('main');
      setNotice(`${word.text} is now the active verb.`);
      return;
    }

    if (word.type !== 'noun') {
      setNotice('Only noun and verb slots are available.');
      return;
    }

    setGameState((current) => {
      const nextWorkbenchBoard = placeWorkbenchWord(
        current.workbenchBoard,
        wordId,
        current.activeNounId,
        STARTING_WORKBENCH_SLOT,
      );
      const nextSentence = parseWorkbenchSentence(nextWorkbenchBoard, wordId);
      const nextNoun = getWordById(nextSentence.activeNounId);
      const nextVerb = nextSentence.effectiveVerbId ? getWordById(nextSentence.effectiveVerbId) : null;

      return {
        ...current,
        activeNounId: nextNoun.id,
        activeWordId: nextNoun.id,
        workbenchBoard: nextWorkbenchBoard,
        activeWordStartedAt: Date.now(),
        passiveMeaningPerSecond: getPassiveGain(
          nextNoun,
          current.filingUpgradeLevel,
          Date.now(),
          Date.now(),
          nextVerb,
        ),
      };
    });
    setActiveTab('main');
    setNotice(`${word.text} is now the active noun.`);
  };

  const handleUnavailableSentenceControl = () => {
    setNotice('More word slots coming soon.');
  };

  const handlePathEventClick = (event: VisiblePathEvent) => {
    if (event.type === 'dream-bloom') {
      const meaningGain = getMeaningBloomGain(gameState.meaning, currentTapGain);

      setVisiblePathEvent(null);
      setGameState((current) => ({
        ...current,
        meaning: add(current.meaning, meaningGain),
        totalMeaningEarned: add(current.totalMeaningEarned, meaningGain),
        stats: recordEventClaim(current.stats, event.type, meaningGain),
      }));
      setSessionStats((current) => recordEventClaim(current, event.type, meaningGain));
      scheduleNextPathEvent(gameState.chosenFirstPath, gameState.dreamUnlocked, effectiveNoun);
      setNotice(`Meaning Bloom: +${formatMeaning(meaningGain)} Meaning`);
      return;
    }

    const nextActiveEvent = createActivePathEvent(event);

    setVisiblePathEvent(null);
    setActivePathEvent(nextActiveEvent);
    setGameState((current) => ({ ...current, stats: recordEventClaim(current.stats, event.type) }));
    setSessionStats((current) => recordEventClaim(current, event.type));
    scheduleNextPathEvent(gameState.chosenFirstPath, gameState.dreamUnlocked, effectiveNoun);

    if (event.type === 'farm') {
      setNotice('Harvest Window active: tapping x2 for 20s');
      return;
    }

    if (event.type === 'water') {
      setNotice('Clear Current active: idle gain increased for 20s');
      return;
    }

    setNotice('Softened Rules active: upgrade costs -25% for 20s');
  };

  const handleDevSpawnPathEvent = () => {
    const eventType = getRandomVisibleEventType(gameState.chosenFirstPath, gameState.dreamUnlocked);

    if (!eventType) {
      setNotice('Choose Farm or Water or unlock Dream before spawning an event.');
      return;
    }

    if (nextEventTimerRef.current) {
      window.clearTimeout(nextEventTimerRef.current);
      nextEventTimerRef.current = null;
    }

    setVisiblePathEvent(createVisiblePathEvent(eventType));
    setGameState((current) => ({ ...current, stats: recordEventSpawn(current.stats) }));
    setSessionStats((current) => recordEventSpawn(current));
    setNotice('Dev test event spawned.');
  };

  const handleBuyStampUpgrade = () => {
    const cost = getEffectiveStampUpgradeCost(
      gameState.stampUpgradeLevel,
      effectiveNoun,
      effectiveVerb,
      softenedRulesCostMultiplier,
    );

    if (lt(gameState.meaning, cost)) {
      return;
    }

    const nextLevel = gameState.stampUpgradeLevel + 1;

    setGameState((current) => {
      const currentActiveNoun = getWordById(current.activeNounId);
      const currentActiveVerb = current.activeVerbId ? getWordById(current.activeVerbId) : null;
      const currentCost = getEffectiveStampUpgradeCost(
        current.stampUpgradeLevel,
        currentActiveNoun,
        currentActiveVerb,
        getSoftenedRulesUpgradeCostMultiplier(activePathEvent),
      );

      if (lt(current.meaning, currentCost)) {
        return current;
      }

      return {
        ...current,
        meaning: sub(current.meaning, currentCost),
        stampUpgradeLevel: current.stampUpgradeLevel + 1,
        stats: recordUpgradePurchase(current.stats),
      };
    });
    setSessionStats((current) => recordUpgradePurchase(current));

    if (getUpgradeMilestoneMultiplier(nextLevel) > getUpgradeMilestoneMultiplier(nextLevel - 1)) {
      setNotice(`Stamp Upgrade milestone reached: x${getUpgradeMilestoneMultiplier(nextLevel)} tapping bonus`);
      return;
    }

    setNotice('Stamp Upgrade increased.');
  };

  const handleBuyFilingUpgrade = () => {
    const cost = getEffectiveFilingUpgradeCost(
      gameState.filingUpgradeLevel,
      effectiveNoun,
      effectiveVerb,
      softenedRulesCostMultiplier,
    );

    if (lt(gameState.meaning, cost)) {
      return;
    }

    const nextLevel = gameState.filingUpgradeLevel + 1;

    setGameState((current) => {
      const currentActiveNoun = getWordById(current.activeNounId);
      const currentActiveVerb = current.activeVerbId ? getWordById(current.activeVerbId) : null;
      const currentCost = getEffectiveFilingUpgradeCost(
        current.filingUpgradeLevel,
        currentActiveNoun,
        currentActiveVerb,
        getSoftenedRulesUpgradeCostMultiplier(activePathEvent),
      );

      if (lt(current.meaning, currentCost)) {
        return current;
      }

      const nextFilingUpgradeLevel = current.filingUpgradeLevel + 1;

      return {
        ...current,
        meaning: sub(current.meaning, currentCost),
        filingUpgradeLevel: nextFilingUpgradeLevel,
        stats: recordUpgradePurchase(current.stats),
        passiveMeaningPerSecond: getPassiveGain(
          currentActiveNoun,
          nextFilingUpgradeLevel,
          current.activeWordStartedAt,
          Date.now(),
          currentActiveVerb,
        ),
      };
    });
    setSessionStats((current) => recordUpgradePurchase(current));

    if (getUpgradeMilestoneMultiplier(nextLevel) > getUpgradeMilestoneMultiplier(nextLevel - 1)) {
      setNotice(`Filing Upgrade milestone reached: x${getUpgradeMilestoneMultiplier(nextLevel)} idle bonus`);
      return;
    }

    setNotice('Filing Upgrade increased.');
  };

  const handleMoveWorkbenchWord = (wordId: WordId, xPercent: number, yPercent: number) => {
    const targetSlot = getNearestWorkbenchSlot(xPercent, yPercent);

    setGameState((current) => {
      const moveResult = moveWorkbenchWordToSlot(current.workbenchBoard, wordId, targetSlot);

      if (!moveResult.moved) {
        setNotice('That sentence slot is locked.');
        return current;
      }

      const nextSentence = parseWorkbenchSentence(moveResult.board, current.activeNounId);
      const nextNoun = getWordById(nextSentence.activeNounId);
      const nextVerb = nextSentence.effectiveVerbId ? getWordById(nextSentence.effectiveVerbId) : null;

      return {
        ...current,
        activeNounId: nextNoun.id,
        activeWordId: nextNoun.id,
        workbenchBoard: moveResult.board,
        passiveMeaningPerSecond: getPassiveGain(
          nextNoun,
          current.filingUpgradeLevel,
          current.activeWordStartedAt,
          Date.now(),
          nextVerb,
        ),
      };
    });
  };

  const handleResetWorkbenchLayout = () => {
    setGameState((current) => {
      const placements = {
        [current.activeNounId]: STARTING_WORKBENCH_SLOT,
      };

      return {
        ...current,
        workbenchBoard: {
          ...current.workbenchBoard,
          placements: current.activeVerbId && current.workbenchBoard.unlockedSlots.includes(FIRST_VERB_WORKBENCH_SLOT)
            ? { ...placements, [current.activeVerbId]: FIRST_VERB_WORKBENCH_SLOT }
            : placements,
        },
      };
    });
    setNotice('Workbench layout reset.');
  };

  const handleReset = () => {
    resetGameState();
    setGameState(createDefaultState());
    const resetAt = Date.now();
    lastPlayTimeUpdateRef.current = resetAt;
    setSessionStats(createDefaultSessionStats(resetAt));
    setActiveTab('main');
    setStamps([]);
    setDreamPromptDismissed(false);
    setNotice('Tap World to stamp Meaning into the record.');
  };

  const handleEnterDream = () => {
    setGameState(unlockDreamLayer);
    setDreamPromptDismissed(false);
    setNotice('Dream entered. New word acquired: Slumber');
  };

  const handleDeclineDream = () => {
    setDreamPromptDismissed(true);
    setNotice('Dream postponed.');
  };

  return (
    <main className={`h-dvh overflow-hidden px-4 py-4 text-ink sm:px-6 ${
      gameState.dreamUnlocked ? 'bg-[#f4e8f1]' : 'bg-paper'
    }`}>
      <div className={`mx-auto grid h-full w-full max-w-2xl grid-rows-[auto_auto_minmax(0,1fr)] rounded-lg border shadow-[0_18px_45px_rgba(61,43,27,0.16)] ${
        gameState.dreamUnlocked
          ? 'border-[#cdb0d6] bg-[#fff7fb]'
          : 'border-[#d7c3a3] bg-[#fffaf0]'
      }`}>
        <header className="border-b border-[#e3d2b7] px-4 py-3 text-center">
          <p className="text-xs font-semibold uppercase text-stone-500">Bureau of Ordinary Terms</p>
          <h1 className="mt-1 font-serif text-3xl font-bold text-[#27211a]">Approved Text</h1>
        </header>

        <ResourceBar
          meaning={formatMeaning(gameState.meaning)}
          passiveMeaningPerSecond={formatRate(currentPassiveGain)}
          activeWord={parsedSentence.sentenceText || effectiveNoun.text}
          pathLabel={effectiveNoun.pathLabel}
          activeEventLabel={activeEventLabel}
        />

        <section className="min-h-0 overflow-y-auto p-4 pb-24">
          {activeTab === 'main' ? (
            <div className="grid min-h-full content-start gap-3">
              <PathBlock activeWord={effectiveNoun} milestone={currentMilestone} />

              {canShowDreamPrompt ? (
                <section className="rounded-lg border-2 border-[#9b6aa8] bg-[#f7ecfb] p-3 shadow-sm">
                  <p className="text-sm font-bold text-[#35263d]">
                    We often understand our world by dreaming about it.
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleEnterDream}
                      className="min-h-10 rounded bg-[#6d4a9a] px-3 py-2 text-sm font-bold text-white shadow-sm active:translate-y-px"
                    >
                      Enter Dream
                    </button>
                    <button
                      type="button"
                      onClick={handleDeclineDream}
                      className="min-h-10 rounded border border-[#cbb5d6] bg-white px-3 py-2 text-sm font-bold text-[#5d4770] shadow-sm active:translate-y-px"
                    >
                      Not yet
                    </button>
                  </div>
                </section>
              ) : null}

              {/* Future rule: sentences should eventually allow only one active word per grammatical type/category. */}
              <WordCard
                noun={effectiveNoun}
                verb={activeVerb}
                effectiveVerb={effectiveVerb}
                verbSlotUnlocked={verbSlotUnlocked}
                manualStampCount={gameState.manualStampCount}
                activeWordStartedAt={gameState.activeWordStartedAt}
                now={now}
                tapGain={currentTapGain}
                passiveGain={currentPassiveGain}
                visiblePathEvent={visiblePathEvent}
                board={gameState.workbenchBoard}
                stamps={stamps}
                onStamp={handleStamp}
                onPathEventClick={handlePathEventClick}
                onUnavailableSlot={handleUnavailableSentenceControl}
                onMoveWord={handleMoveWorkbenchWord}
                onResetLayout={handleResetWorkbenchLayout}
              />

              <QuoteFeed />

              <PathChoicePanel
                meaning={gameState.meaning}
                chosenFirstPath={gameState.chosenFirstPath}
                choices={unlockChoices}
                onChooseWord={handleChooseWord}
              />

              <div className="flex items-center justify-between gap-2 text-xs text-stone-500">
                <button
                  type="button"
                  onClick={handleReset}
                  className="min-h-9 rounded border border-stone-300 bg-white px-3 py-1 text-sm font-semibold text-stone-700 shadow-sm transition hover:bg-stone-50 active:translate-y-px"
                >
                  Reset Save
                </button>
                {IS_DEV_MODE ? (
                  <button
                    type="button"
                    onClick={handleDevSpawnPathEvent}
                    className="min-h-9 rounded border border-[#b89764] bg-[#fff7e8] px-3 py-1 text-sm font-semibold text-[#6f4f24] shadow-sm transition hover:bg-white active:translate-y-px"
                  >
                    Dev Event
                  </button>
                ) : null}
                <span>
                  {gameState.lastSavedAt
                    ? `Last saved ${new Date(gameState.lastSavedAt).toLocaleTimeString()}`
                    : 'Not saved yet'}
                </span>
              </div>
            </div>
          ) : null}

          {activeTab === 'dictionary' ? (
            <DictionaryScreen
              unlockedWords={unlockedWords}
              activeNounId={gameState.activeNounId}
              activeVerbId={gameState.activeVerbId}
              onSelectWord={handleSelectWord}
            />
          ) : null}

          {activeTab === 'upgrades' ? (
            <WordUpgradesMessage
              meaning={gameState.meaning}
              activeWord={effectiveNoun}
              activeVerb={effectiveVerb}
              stampUpgradeLevel={gameState.stampUpgradeLevel}
              filingUpgradeLevel={gameState.filingUpgradeLevel}
              upgradeCostMultiplier={softenedRulesCostMultiplier}
              onBuyStampUpgrade={handleBuyStampUpgrade}
              onBuyFilingUpgrade={handleBuyFilingUpgrade}
            />
          ) : null}

          {activeTab === 'stats' ? (
            <StatsScreen
              gameState={gameState}
              sessionStats={sessionStats}
              currentTapGain={currentTapGain}
              currentPassiveGain={currentPassiveGain}
              currentSentence={parsedSentence.sentenceText || effectiveNoun.text}
              now={now}
            />
          ) : null}
        </section>

        <nav className="fixed bottom-0 left-1/2 z-50 grid w-full max-w-2xl -translate-x-1/2 grid-cols-4 border border-b-0 border-[#d7c3a3] bg-[#f7eddb] p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(61,43,27,0.14)]">
          {(['main', 'dictionary', 'upgrades', 'stats'] as AppTab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`min-h-11 rounded text-sm font-bold capitalize transition ${
                activeTab === tab
                  ? 'bg-[#2d2922] text-[#fff8e9]'
                  : 'text-stone-600 hover:bg-[#fffaf0]'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </main>
  );
}

export default App;
