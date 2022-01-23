/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import actionTypes from './action-types';
import { FilteredTVShowResults, TVSeason, TVShowDetails, TVShowListTypes } from '../@types';

export type RootState = {
  currentResultType: TVShowListTypes;
  loading: boolean;
  activeShow: FilteredTVShowResults | null;
  isFetchingEpisode: boolean;
  topRated: FilteredTVShowResults[];
  popular: FilteredTVShowResults[];
  custom: FilteredTVShowResults[];
  seasonsById: Record<number, TVSeason[]>;
  episodesById: Record<number, number[]>;
};

// TODO Add paging to network request on all search results for scroll bottom
const INITIAL_STATE: RootState = {
  currentResultType: TVShowListTypes.POPULAR,
  loading: false,
  activeShow: null,
  isFetchingEpisode: false,
  topRated: [],
  popular: [],
  custom: [],
  seasonsById: {}, // By TVShowId
  episodesById: {}, // By TvShowId
};

const setCurrentResultType = (state: RootState, resultType: TVShowListTypes) =>
  produce(state, (draftState) => {
    draftState.currentResultType = resultType;
  });

const setLoadingState = (state: RootState, isLoading: boolean) =>
  produce(state, (draftState) => {
    draftState.loading = isLoading;
  });

const setIsFetchingState = (state: RootState, isFetching: boolean) =>
  produce(state, (draftState) => {
    draftState.isFetchingEpisode = isFetching;
  });

const sortByPopularity = (valueA: FilteredTVShowResults, valueB: FilteredTVShowResults): number => {
  if (valueA.popularity > valueB.popularity) {
    return -1;
  }
  if (valueA.popularity < valueB.popularity) {
    return 1;
  }
  return 0;
};

const addShowResultsToStore = (
  state: RootState,
  data: {
    tvShowListType: TVShowListTypes;
    tvShowResults: FilteredTVShowResults[];
  }
) => {
  const { tvShowListType, tvShowResults } = data;

  const sortedResults = tvShowResults.sort(sortByPopularity);

  const newState = produce(state, (draftState) => {
    switch (tvShowListType) {
      case TVShowListTypes.POPULAR:
        draftState.popular = sortedResults;
        break;
      case TVShowListTypes.TOP_RATED:
        draftState.topRated = sortedResults;
        break;
      case TVShowListTypes.CUSTOM:
        draftState.custom = sortedResults;
        break;
      default:
        break;
    }
  });
  return newState;
};

const setActiveShow = (state: RootState, tvShow: FilteredTVShowResults | null) =>
  produce(state, (draftState) => {
    draftState.activeShow = tvShow?.id === state.activeShow?.id ? null : tvShow;
  });

const clearActiveShow = (state: RootState) =>
  produce(state, (draftState) => {
    draftState.activeShow = null;
  });

const clearCustomResults = (state: RootState) =>
  produce(state, (draftState) => {
    draftState.custom = [];
  });

const addSeasonDetails = (state: RootState, seasonDetails: TVShowDetails) =>
  produce(state, (draftState) => {
    draftState.seasonsById[seasonDetails.id] = seasonDetails.seasons
      .sort((a, b) => a.season_number - b.season_number)
      // Remove seasons will no air_date and season_number 0 includes weird special episodes
      .filter((season) => season.air_date && season.season_number > 0);
  });

const movieSearch = (state = INITIAL_STATE, action: { type: string; data: any }) => {
  if (state === undefined) {
    return INITIAL_STATE;
  }
  switch (action.type) {
    case actionTypes.SET_IS_LOADING:
      return setLoadingState(state, action.data.loading);
    case actionTypes.SET_CURRENT_RESULT_TYPE:
      return setCurrentResultType(state, action.data.tvShowListType);
    case actionTypes.SET_IS_FETCHING_EPISODE:
      return setIsFetchingState(state, action.data.isFetching);
    case actionTypes.CLEAR_SEARCH_RESULTS_CUSTOM:
      return clearCustomResults(state);
    case actionTypes.UPDATE_SEARCH_RESULTS:
      return addShowResultsToStore(state, action.data);
    case actionTypes.SET_ACTIVE_SHOW:
      return setActiveShow(state, action.data.tvShow);
    case actionTypes.CLEAR_ACTIVE_SHOW:
      return clearActiveShow(state);
    case actionTypes.ADD_SEASON_DETAILS:
      return addSeasonDetails(state, action.data.seasonDetails);
    default:
      return state;
  }
};

export default movieSearch;
