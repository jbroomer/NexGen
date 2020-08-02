import immutable from 'immutable';
import actionTypes from './action-types';
import actionsTypes from './action-types';

const INITIAL_STATE = immutable.fromJS({
  loading: false,
  key: "api_key=6e8556079c0e1a842e60fdb88680228f",
  topRated: immutable.List([]),
  popular: immutable.List([]),
  custom: immutable.List([]),
})

const movieSearch = (state = INITIAL_STATE, action) => {
  if(typeof state === undefined) {
    return INITIAL_STATE;
  }
  switch(action.type) {
    case actionsTypes.UPDATE_SEARCH_RESULTS_CUSTOM:
      return state.set('custom', immutable.List(action.data));
    case actionTypes.UPDATE_SEARCH_RESULTS_POPULAR:
      return state.set('popular', immutable.List(action.data));
    case actionTypes.UPDATE_SEARCH_RESULTS_TOP_RATED:
      return state.set('topRated', immutable.List(action.data));
    default:
      return state;
  }
};

export default movieSearch;