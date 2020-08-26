import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

const mapStateToProps = (state) => ({
  loading: state.get('loading'),
  results: {
    popular: state.get('popular').toJS(),
    topRated: state.get('topRated').toJS(),
    custom: state.get('custom').toJS(),
  },
});

const mapDispatchToProps = (dispatch) => ({
  searchPopularResults: () => dispatch(getPopularResults()),
  searchTopRatedResults: () => dispatch(getTopRatedResults()),
  searchCustomResults: (searchString) => dispatch(getCustomResults(searchString)),
});

const propTypes = {
  loading: PropTypes.bool.isRequired,
  results: PropTypes.shape([]).isRequired,
  searchPopularResults: PropTypes.func.isRequired,
  searchTopRatedResults: PropTypes.func.isRequired,
  searchCustomResults: PropTypes.func.isRequired,
};

const App = ({
  loading,
  results,
  searchPopularResults,
  searchTopRatedResults,
  searchCustomResults,
}) => {
  const [currentResultType, setCurrentResultType] = useState(resultTypes.popular);

  // Startup on popular results
  useEffect(() => {
    searchPopularResults();
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
    loading
      ? renderIsLoading()
      : (
        <div className="no-results">
          <h2>No Results</h2>
        </div>
      )
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
    <div style={{ textAlign: 'center' }}>
      <AppBar searchHandler={searchHandler} />
      <Search
        currentResultType={currentResultType}
        searchHandler={searchHandler}
      />
      {renderResults()}
    </div>
  );
};
App.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(App);
