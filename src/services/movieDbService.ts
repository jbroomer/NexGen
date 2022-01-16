import { TVShowListTypes, TVShowResults } from '../@types';
import { getPreconfiguredShowList, getCustomSearchResults } from '../clients/movieDbClient';

/**
 * Get a list of TV Shows of a given type: popular, top rated, or custom
 */
export const getTVShowResults = async (
  listType: TVShowListTypes,
  searchQuery?: string
): Promise<TVShowResults[]> => {
  let tvShowResults;
  switch (listType) {
    case TVShowListTypes.POPULAR:
      tvShowResults = await getPreconfiguredShowList(TVShowListTypes.POPULAR);
      break;
    case TVShowListTypes.TOP_RATED:
      tvShowResults = await getPreconfiguredShowList(TVShowListTypes.TOP_RATED);
      break;
    case TVShowListTypes.CUSTOM:
      tvShowResults = await getCustomSearchResults(searchQuery);
      break;
    default:
      break;
  }
  return tvShowResults.results || [];
};
