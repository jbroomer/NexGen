import { useEffect, useLayoutEffect, useState } from 'react';

export enum ScreenSizes {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

/**
 * Found standard screen sizes here:
 * https://www.browserstack.com/guide/ideal-screen-sizes-for-responsive-design
 */
const SCREEN_SIZE_MAP: Record<ScreenSizes, number> = {
  [ScreenSizes.SMALL]: 0, // Min width
  [ScreenSizes.MEDIUM]: 641, // Min width
  [ScreenSizes.LARGE]: 1008, // Min width
};

const getWindowSize = (): ScreenSizes => {
  if (window.outerWidth > SCREEN_SIZE_MAP[ScreenSizes.LARGE]) {
    return ScreenSizes.LARGE;
  }
  if (window.outerWidth > SCREEN_SIZE_MAP[ScreenSizes.MEDIUM]) {
    return ScreenSizes.MEDIUM;
  }
  return ScreenSizes.SMALL;
};

type UseScreenSizeHook = () => {
  screenSizeLabel: ScreenSizes;
  isMobile: boolean;
};

export const useScreenSize: UseScreenSizeHook = () => {
  const [screenSizeLabel, setScreenSizeLabel] = useState(ScreenSizes.MEDIUM);

  // Get intial window size
  useEffect(() => {
    setScreenSizeLabel(getWindowSize());
  }, []);

  useLayoutEffect(() => {
    const onWindowResize = () => {
      setScreenSizeLabel(getWindowSize());
    };
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return {
    screenSizeLabel,
    isMobile: screenSizeLabel === ScreenSizes.SMALL,
  };
};
