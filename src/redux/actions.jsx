import actionTypes from './action-types';

const clearCustomResults = () => ({
  type: actionTypes.CLEAR_SEARCH_RESULTS_CUSTOM,
});

const addResults = (type, result) => ({
  type,
  data: result,
});

const setIsLoading = (loading) => ({
  type: actionTypes.SET_IS_LOADING,
  data: {
    loading,
  },
});

const setIsFetchingEpisode = (isFetching) => ({
  type: actionTypes.SET_IS_FETCHING_EPISODE,
  data: {
    isFetching,
  },
});

const setNumSeasons = (id, numSeasons) => ({
  type: actionTypes.SET_NUM_SEASONS,
  data: {
    id,
    numSeasons,
  },
});

const setNumEpisodes = (id, season, numEpsiodes) => ({
  type: actionTypes.SET_NUM_EPISODES,
  data: {
    id,
    season,
    numEpsiodes,
  },
});

const setRandomEpisode = (id, randomSeason, randomEpisode) => ({
  type: actionTypes.SET_RANDOM_EPISODE,
  data: {
    id,
    randomSeason,
    randomEpisode,
  },
});

const filterAndParseSearchResults = (unparsedResults) => (
  unparsedResults.filter((episode) => (
    episode.poster_path != null
  )).map((episode) => ({
    id: episode.id,
    img: `https://image.tmdb.org/t/p/w500${episode.poster_path}`,
    year: episode.first_air_date?.substring(0, 4),
    popularity: episode.popularity || 0,
  }))
);

/**
 * Remove any results without an image, we don't want em anyways
 * and add the episode id, img, and year
 */
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
        const resultsToAdd = filterAndParseSearchResults(results);

        resultsToAdd.forEach((result) => {
          dispatch(addResults(type, result));
        });
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
    const isAlreadyFetched = getState().get('popularById').size > 0;
    if (isAlreadyFetched) {
      return;
    }
    const url = `https://api.themoviedb.org/3/tv/popular?${getState().get('key')}&language=en-US`;
    dispatch(performSearch(actionTypes.UPDATE_SEARCH_RESULTS_POPULAR, url));
  }
);

const getTopRatedResults = () => (
  (dispatch, getState) => {
    const isAlreadyFetched = getState().get('topRatedById').size > 0;
    if (isAlreadyFetched) {
      return;
    }
    const url = `https://api.themoviedb.org/3/tv/top_rated?${getState().get('key')}&language=en-US`;
    dispatch(performSearch(actionTypes.UPDATE_SEARCH_RESULTS_TOP_RATED, url));
  }
);

const getCustomResults = (searchString) => (
  (dispatch, getState) => {
    dispatch(clearCustomResults());
    const url = `https://api.themoviedb.org/3/search/tv?${getState().get('key')}&language=en-US&query=${searchString}`;
    dispatch(performSearch(actionTypes.UPDATE_SEARCH_RESULTS_CUSTOM, url));
  }
);

const requestNumSeasons = (id) => (
  (dispatch) => {
    const urlString = `https://api.themoviedb.org/3/tv/${id}?api_key=6e8556079c0e1a842e60fdb88680228f`;
    return new Promise((res, rej) => {
      fetch(urlString)
        .then((response) => response.json())
        .then((searchResults) => {
          console.log('Seasons: ', searchResults.number_of_seasons);
          dispatch(
            setNumSeasons(id, searchResults.number_of_seasons),
          );
          res(searchResults.number_of_seasons);
        })
        .catch((error) => {
          rej(error);
          console.error('Error:', error);
        });
    });
  }
);

// Helper function to generate random number
const generateRandomNum = (num) => Math.floor(Math.random() * (num)) + 1;

const requestNumEpisodes = (id, season) => (
  (dispatch) => {
    const urlString = `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=6e8556079c0e1a842e60fdb88680228f`;
    return new Promise((res, rej) => {
      fetch(urlString)
        .then((response) => response.json())
        .then((searchResults) => {
          const numEpisodes = (searchResults.episodes.length);
          console.log('Episodes: ', numEpisodes);
          dispatch(setNumEpisodes(id, season, numEpisodes));
          res(numEpisodes);
        })
        .catch((error) => {
          rej(error);
          console.error('Error:', error);
        });
    });
  }
);

const getNewEpisode = (id, season) => (
  (dispatch, getState) => {
    let getNewEpisodePromise;
    let randomEpisode;
    const numEpisodes = getState().getIn(['seasonsById', id, season]);
    if (numEpisodes) {
      getNewEpisodePromise = new Promise((res) => res(numEpisodes.size));
      randomEpisode = generateRandomNum(numEpisodes);
    } else {
      getNewEpisodePromise = dispatch(requestNumEpisodes(id, season));
    }
    getNewEpisodePromise.then((episodes) => {
      randomEpisode = generateRandomNum(episodes);
      dispatch(setRandomEpisode(id, season, randomEpisode));
      dispatch(setIsFetchingEpisode(false));
    });
  }
);

const getNewSeason = (id) => (
  (dispatch, getState) => {
    let getNewSeasonPromise;
    let randomSeason;
    const numSeasons = getState().getIn(['seasonsById', id]);
    if (numSeasons) {
      console.log(numSeasons);
      getNewSeasonPromise = new Promise((res) => res(numSeasons.size));
    } else {
      getNewSeasonPromise = dispatch(requestNumSeasons(id));
    }
    getNewSeasonPromise.then((seasons) => {
      randomSeason = generateRandomNum(seasons);
      dispatch(getNewEpisode(id, randomSeason));
    });
  }
);

/**
 * Start the retrieval of a new random episode
 * @param {String} id the id of the show requesting a new episode
 */
const refreshRandomEpisode = (id) => (
  (dispatch) => {
    setIsFetchingEpisode(true);
    dispatch(getNewSeason(id));
  }
);

export {
  getPopularResults,
  getTopRatedResults,
  getCustomResults,
  refreshRandomEpisode,
};
