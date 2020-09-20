import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import ResultsContainer from './components/results-container';
import AppBar from './components/app-bar';
import Search from './components/search-bar';
import resultTypes from './components/utils/resultTypeMap';
import {
  getPopularResults,
  getTopRatedResults,
  getCustomResults,
} from './redux/actions';
import './App.css';

const App = () => {
  // Redux Stuff
  const loading = useSelector((state) => state.get('loading'));
  const results = useSelector((state) => ({
    popular: state.get('popularById'),
    topRated: state.get('topRatedById'),
    custom: state.get('customById'),
  }), shallowEqual);
  const dispatch = useDispatch();

  const searchPopularResults = useCallback(() => {
    dispatch(getPopularResults());
  }, [dispatch]);

  const searchTopRatedResults = useCallback(() => {
    dispatch(getTopRatedResults());
  }, [dispatch]);

  const searchCustomResults = useCallback((searchText) => {
    dispatch(getCustomResults(searchText));
  }, [dispatch]);

  const [currentResultType, setCurrentResultType] = useState(resultTypes.popular);
  // Startup on popular results
  useEffect(() => {
    dispatch(getPopularResults());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Keep track of the current search preference when navbar shortcuts are
   * selected
   * @param {String} type the desired search type
   * @param {String} searchString a search string if result type custom
   */
  const searchHandler = (type, searchString) => {
    if (type === resultTypes.custom && !searchString) {
      setCurrentResultType(resultTypes.popular);
      return;
    }
    switch (type) {
      case resultTypes.popular:
        searchPopularResults();
        break;
      case resultTypes.topRated:
        searchTopRatedResults();
        break;
      case resultTypes.custom:
        searchCustomResults(searchString);
        break;
      default:
        searchPopularResults();
    }
    setCurrentResultType(type);
  };

  const renderIsLoading = () => 'Loading...';

  const renderNoResults = () => (
    !loading && !results[currentResultType].length
      ? (
        <div className="no-results">
          <h2>No Results</h2>
        </div>
      )
      : renderIsLoading()
  );

  const renderResults = () => (
    loading
      ? renderNoResults()
      : (
        <ResultsContainer
          currentResultType={currentResultType}
          results={results}
        />
      )
  );

  return (
    <div className="app__container">
      <AppBar searchHandler={searchHandler} />
      <Search
        currentResultType={currentResultType}
        searchHandler={searchHandler}
      />
      {renderResults()}
    </div>
  );
};
export default App;
