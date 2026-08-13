import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook that cycles through an array of words at a given interval.
 * @param {Object} options
 * @param {string[]} options.words - Array of words to cycle through
 * @param {number} [options.interval=2] - Interval in seconds between word changes
 * @returns {{ currentWord: string, key: number }}
 */
export function useWordCarousel({ words, interval = 2 }) {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % words.length);
  }, [words.length]);

  useEffect(() => {
    const id = setInterval(next, interval * 1000);
    return () => clearInterval(id);
  }, [next, interval]);

  return {
    currentWord: words[index],
    key: index,
  };
}
