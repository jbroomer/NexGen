import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import actionTypes from './action-types';
import { FilteredTVShowResults, TVShowDetails, TVShowListTypes } from '../@types';
import { getTVShowResults } from '../services/movieDbService';
import { RootState } from './reducers';
import { getTVShowDetails } from '../clients/movieDbClient';

const addResults = (tvShowListType: TVShowListTypes, tvShowResults: FilteredTVShowResults[]) => ({
  type: actionTypes.UPDATE_SEARCH_RESULTS,
  data: {
    tvShowListType,
    tvShowResults,
  },
});

const setIsLoading = (loading: boolean) => ({
  type: actionTypes.SET_IS_LOADING,
  data: {
    loading,
  },
});

const setActiveTVShow = (tvShow: FilteredTVShowResults | null) => ({
  type: actionTypes.SET_ACTIVE_SHOW,
  data: {
    tvShow,
  },
});

const clearActiveTVShow = () => ({
  type: actionTypes.CLEAR_ACTIVE_SHOW,
});

const addAllSeasons = (seasonDetails: TVShowDetails) => ({
  type: actionTypes.ADD_SEASON_DETAILS,
  data: {
    seasonDetails,
  },
});

// Helper function to extract data we want to store
const getFilteredTVShowResults = async (
  tvShowListType: TVShowListTypes,
  searchQuery?: string
): Promise<FilteredTVShowResults[]> => {
  const tvShowResults = await getTVShowResults(tvShowListType, searchQuery);
  return tvShowResults
    .filter((episode) => episode.poster_path != null)
    .map((episode) => ({
      id: episode.id,
      name: episode.name,
      imgPath: `https://image.tmdb.org/t/p/w500${episode.poster_path}`,
      year: episode.first_air_date?.substring(0, 4),
      popularity: episode.popularity || 0,
      overview: episode.overview,
    }));
};

// Helper function to check if data already exists
const isAlreadyFetched = (showMap: FilteredTVShowResults[]): boolean => showMap.length > 0;

/**
 * Redux thunk to retrieve and add popular results to the store
 */
const getPopularResults =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch, getState) => {
    if (!isAlreadyFetched(getState().popular)) {
      const results = await getFilteredTVShowResults(TVShowListTypes.POPULAR);
      dispatch(addResults(TVShowListTypes.POPULAR, results));
    }
  };

/**
 * Redux thunk to retrieve and add top rated results to the store
 */
const getTopRatedResults =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch, getState) => {
    if (!isAlreadyFetched(getState().topRated)) {
      const results = await getFilteredTVShowResults(TVShowListTypes.TOP_RATED);
      dispatch(addResults(TVShowListTypes.TOP_RATED, results));
    }
  };

/**
 * Redux thunk to retrieve and add custom results to the store
 */
const getCustomResults =
  (searchQuery: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    const results = await getFilteredTVShowResults(TVShowListTypes.CUSTOM, searchQuery);
    dispatch(addResults(TVShowListTypes.CUSTOM, results));
  };

const getTvShowResults =
  (
    tvShowListType: TVShowListTypes,
    searchQuery?: string
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(setIsLoading(true));
    switch (tvShowListType) {
      case TVShowListTypes.POPULAR:
        await dispatch(getPopularResults());
        break;
      case TVShowListTypes.TOP_RATED:
        await dispatch(getTopRatedResults());
        break;
      case TVShowListTypes.CUSTOM:
        await dispatch(getCustomResults(searchQuery as string));
        break;
      default:
        break;
    }
    dispatch(setIsLoading(false));
  };

const getAllSeasons =
  (id: number): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    const allSeasons = await getTVShowDetails(id);
    dispatch(addAllSeasons(allSeasons));
  };

const retrieveAndSetActiveTVShow =
  (tvShow: FilteredTVShowResults): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    if (!getState().seasonsById[tvShow.id]) {
      dispatch(getAllSeasons(tvShow.id));
    }
    dispatch(setActiveTVShow(tvShow));
  };

export { getTvShowResults, getAllSeasons, retrieveAndSetActiveTVShow, clearActiveTVShow };
