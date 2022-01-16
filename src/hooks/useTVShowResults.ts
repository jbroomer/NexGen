import cloneDeep from 'lodash/cloneDeep';
import { useSelector } from 'react-redux';
import { TVShowListTypes, FilteredTVShowResults } from '../@types';
import { RootState } from '../redux/reducers';
import { useScreenSize, ScreenSizes } from './useScreenSize';

// Max number of results per row
const MAX_NUM_RESULTS_MAP = {
  [ScreenSizes.SMALL]: 1,
  [ScreenSizes.MEDIUM]: 4,
  [ScreenSizes.LARGE]: 6,
};

const chunk = (items: any[], chunkSize: number): any[][] => {
  const clonedItems = cloneDeep(items);
  const chunks = [];
  while (clonedItems.length) {
    chunks.push(clonedItems.splice(0, chunkSize));
  }
  return chunks;
};

/**
 * Chunk the tv show results into rows of specified size based on user screen size
 */
export const useTVShowResults = (tvShowListType: TVShowListTypes): FilteredTVShowResults[][] => {
  const screenSize = useScreenSize();

  const results = useSelector((state: RootState) => {
    switch (tvShowListType) {
      case TVShowListTypes.POPULAR:
        return state.popular;
      case TVShowListTypes.TOP_RATED:
        return state.topRated;
      case TVShowListTypes.CUSTOM:
        return state.custom;
      default:
        return [];
    }
  });

  return chunk(results, MAX_NUM_RESULTS_MAP[screenSize]);
};
