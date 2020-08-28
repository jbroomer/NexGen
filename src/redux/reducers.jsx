import immutable from 'immutable';
import actionTypes from './action-types';
import resultsTypeMap from '../components/utils/resultTypeMap';

const INITIAL_STATE = immutable.fromJS({
  loading: false,
  isFetchingEpisode: false,
  key: 'api_key=6e8556079c0e1a842e60fdb88680228f',
  currentResultType: resultsTypeMap.popular,
  topRatedById: immutable.Map({}),
  popularById: immutable.Map({}),
  customById: immutable.Map({}),
  seasonsById: immutable.Map({}),
  randomEpisodeById: immutable.Map({}),
});

const sortByPopularity = (valueA, valueB) => {
  if (valueA.popularity > valueB.popularity) {
    return -1;
  }
  if (valueA.popularity < valueB.popularity) {
    return 1;
  }
  return 0;
};

const addShowResultsToStore = (state, resultsType, result) => {
  let newState = state;
  const targetKey = `${resultsType}ById`;
  newState = newState.updateIn([targetKey], (target) => (
    target.merge({ [result.id]: result }).sort(sortByPopularity)
  ));
  return newState;
};

const addNumSeasons = (state, id, numSeasons) => {
  let seasonsMap = immutable.Map([]);
  for (let i = 1; i <= numSeasons; i += 1) {
    seasonsMap = seasonsMap.set(i, null);
  }
  return state.updateIn(['seasonsById', id], () => seasonsMap);
};

const addNumEpisodes = (state, id, season, numEpisodes) => (
  state.updateIn(['seasonsById', id, season], () => numEpisodes)
);

const setRandomEpisode = (state, id, randomSeason, randomEpisode) => (
  state.updateIn(['randomEpisodeById', id], () => ({
    season: randomSeason,
    episode: randomEpisode,
  }))
);

const movieSearch = (state = INITIAL_STATE, action) => {
  if (state === undefined) {
    return INITIAL_STATE;
  }
  switch (action.type) {
    case actionTypes.SET_IS_LOADING:
      return state.set('loading', action.data.loading);
    case actionTypes.CLEAR_SEARCH_RESULTS_CUSTOM:
      return state.updateIn(['customById'], () => immutable.OrderedMap({}));
    case actionTypes.SET_NUM_SEASONS:
      return addNumSeasons(state, action.data.id, action.data.numSeasons);
    case actionTypes.SET_NUM_EPISODES:
      return addNumEpisodes(state, action.data.id, action.data.season, action.datanumEpisodes);
    case actionTypes.UPDATE_SEARCH_RESULTS_CUSTOM:
      return addShowResultsToStore(state, resultsTypeMap.custom, action.data);
    case actionTypes.UPDATE_SEARCH_RESULTS_POPULAR:
      return addShowResultsToStore(state, resultsTypeMap.popular, action.data);
    case actionTypes.UPDATE_SEARCH_RESULTS_TOP_RATED:
      return addShowResultsToStore(state, resultsTypeMap.topRated, action.data);
    case actionTypes.SET_RANDOM_EPISODE:
      return setRandomEpisode(
        state,
        action.data.id,
        action.data.randomSeason,
        action.data.randomEpisode,
      );
    default:
      return state;
  }
};

export default movieSearch;
