import { useEffect, useState } from 'react';
import { gameQuotes, selectQuoteIndex } from '../data/quotes.ts';

const FADE_DURATION_MS = 1500;
const MIN_VISIBLE_DURATION_MS = 8000;
const VISIBLE_DURATION_RANGE_MS = 4000;
const MIN_PAUSE_DURATION_MS = 1000;
const PAUSE_DURATION_RANGE_MS = 2000;

function QuoteFeed() {
  const [quoteIndex, setQuoteIndex] = useState(() => selectQuoteIndex(gameQuotes.length));
  const [isVisible, setIsVisible] = useState(false);
  const [hasShownFirstQuote, setHasShownFirstQuote] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const visibleDuration = MIN_VISIBLE_DURATION_MS + Math.random() * VISIBLE_DURATION_RANGE_MS;
      const timeoutId = window.setTimeout(() => setIsVisible(false), visibleDuration);
      return () => window.clearTimeout(timeoutId);
    }

    const pauseDuration = hasShownFirstQuote
      ? FADE_DURATION_MS + MIN_PAUSE_DURATION_MS + Math.random() * PAUSE_DURATION_RANGE_MS
      : 50;
    const timeoutId = window.setTimeout(() => {
      setQuoteIndex((currentIndex) => selectQuoteIndex(gameQuotes.length, currentIndex));
      setHasShownFirstQuote(true);
      setIsVisible(true);
    }, pauseDuration);

    return () => window.clearTimeout(timeoutId);
  }, [hasShownFirstQuote, isVisible]);

  const quote = gameQuotes[quoteIndex];

  if (!quote) {
    return null;
  }

  return (
    <section
      data-no-stamp="true"
      aria-live="off"
      className="pointer-events-none flex min-h-20 w-full items-center justify-center rounded-lg border border-[#d6bc92] bg-[#fffdf6] px-4 py-2 text-center shadow-sm"
    >
      <div className={`transition-opacity duration-[1500ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <p className="font-serif text-sm italic leading-5 text-stone-600">&ldquo;{quote.text}&rdquo;</p>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-stone-400">
          {quote.author}
        </p>
      </div>
    </section>
  );
}

export default QuoteFeed;
