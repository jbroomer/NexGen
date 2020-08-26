import actionTypes from './action-types';

const addResults = (type, results) => ({
  type,
  data: results,
});

const setIsLoading = (loading) => ({
  type: actionTypes.SET_IS_LOADING,
  data: {
    loading,
  },
});

const performSearch = (type, url) => (
  (dispatch) => {
    dispatch(setIsLoading(true));
    fetch(url)
      .then((response) => response.json())
      .then((searchResults) => {
        const { results } = searchResults;
        if (!results) {
          return;
        }
        /**
         * Remove any results without an image, we don't want em anyways
         * and add the episode id, img, and year
         */
        const resultsToAdd = results.filter((episode) => (
          episode.poster_path != null
        )).map((episode) => ({
          id: episode.id,
          img: `https://image.tmdb.org/t/p/w500${episode.poster_path}`,
          year: episode.first_air_date.substring(0, 4),
        }));
        dispatch(addResults(type, resultsToAdd));
      }).then(() => {
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
);

const getPopularResults = () => (
  (dispatch, getState) => {
    const isAlreadyFetched = getState().get('popular').size > 0;
    if (isAlreadyFetched) {
      return;
    }
    const url = `https://api.themoviedb.org/3/tv/popular?${getState().get('key')}&language=en-US`;
    dispatch(performSearch(actionTypes.UPDATE_SEARCH_RESULTS_POPULAR, url));
  }
);

const getTopRatedResults = () => (
  (dispatch, getState) => {
    const isAlreadyFetched = getState().get('topRated').size > 0;
    if (isAlreadyFetched) {
      return;
    }
    const url = `https://api.themoviedb.org/3/tv/top_rated?${getState().get('key')}&language=en-US`;
    dispatch(performSearch(actionTypes.UPDATE_SEARCH_RESULTS_TOP_RATED, url));
  }
);

const getCustomResults = (searchString) => (
  (dispatch, getState) => {
    const url = `https://api.themoviedb.org/3/search/tv?${getState().get('key')}&language=en-US&query=${searchString}`;
    dispatch(performSearch(actionTypes.UPDATE_SEARCH_RESULTS_CUSTOM, url));
  }
);

export {
  getPopularResults,
  getTopRatedResults,
  getCustomResults,
};
