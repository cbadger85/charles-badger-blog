import { useState, useEffect } from 'react';

export const useMediaQuery = (maxWidth: number) => {
  const mediaQueryList =
    typeof window === 'undefined'
      ? null
      : window.matchMedia(`(max-width: ${maxWidth}px)`);

  const [isMatched, setIsMatched] = useState(!!mediaQueryList?.matches);

  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMatched(e.matches);
    };
    mediaQueryList?.addListener(handleChange);

    return () => {
      mediaQueryList?.removeListener(handleChange);
    };
  });

  return isMatched;
};
