import { useState, useEffect } from 'react';

export const useMediaQuery = (maxWidth: number) => {
  const mediaQueryList = window.matchMedia(`(max-width: ${maxWidth}px)`);

  const [isMatched, setIsMatched] = useState(mediaQueryList.matches);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setCurrentDevice(getDevice());
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // });

  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMatched(e.matches);
    };
    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  });

  return isMatched;
};
