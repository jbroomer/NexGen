import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { css } from '@emotion/react';
import { useDispatch } from 'react-redux';
import AppBar from './components/app-bar';
import SearchBar from './components/search-bar';
import { getTvShowResults } from './redux/actions';
import { TVShowListTypes } from './@types';

const ResultsContainer = React.lazy(() => import('./components/results-container'));

const searchBarContainer = css`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 20px 0px;
`;

const App = () => {
  const [currentResultType, setCurrentResultType] = useState(TVShowListTypes.POPULAR);

  // Redux Stuff
  const dispatch = useDispatch();

  const getPopularResults = useCallback(() => {
    dispatch(getTvShowResults(TVShowListTypes.POPULAR));
  }, [dispatch]);

  const getTopRatedResults = useCallback(() => {
    dispatch(getTvShowResults(TVShowListTypes.TOP_RATED));
  }, [dispatch]);

  const getCustomResults = useCallback(
    (searchQuery) => {
      dispatch(getTvShowResults(TVShowListTypes.CUSTOM, searchQuery));
    },
    [dispatch]
  );

  // Startup on popular results
  useEffect(() => {
    getPopularResults();
  }, [getPopularResults]);

  const searchHandler = (type: TVShowListTypes, searchQuery?: string) => {
    if (type === TVShowListTypes.CUSTOM && !searchQuery) {
      setCurrentResultType(TVShowListTypes.POPULAR);
      return;
    }
    switch (type) {
      case TVShowListTypes.POPULAR:
        getPopularResults();
        break;
      case TVShowListTypes.TOP_RATED:
        getTopRatedResults();
        break;
      case TVShowListTypes.CUSTOM:
        getCustomResults(searchQuery);
        break;
      default:
        getPopularResults();
    }
    setCurrentResultType(type);
  };

  return (
    <div className="app__container">
      <AppBar
        searchHandler={searchHandler}
        currentResultType={currentResultType}
        setCurrentResultType={setCurrentResultType}
      />
      <div css={searchBarContainer}>
        <SearchBar currentResultType={currentResultType} searchHandler={searchHandler} />
      </div>
      <Suspense fallback={<div />}>
        <ResultsContainer currentResultType={currentResultType} />
      </Suspense>
    </div>
  );
};
export default App;
