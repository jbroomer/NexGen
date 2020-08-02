import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Container } from 'react-bootstrap';
import ResultsCol from './components/results-col';
import AppBar from './components/app-bar';
import Search from './components/search-bar';
import resultTypes from './components/utils/resultTypeMap';
import {
  getPopularResults,
  getTopRatedResults,
  getCustomResults
} from './redux/actions';
import './App.css';

const mapStateToProps = (state) => ({
  loading: state.get('loading'),
  results: {
    popular: state.get('popular').toJS(),
    topRated: state.get('topRated').toJS(),
    custom: state.get('custom').toJS()
  }
});

const mapDispatchToProps = (dispatch) => ({
  searchPopularResults: () => dispatch(getPopularResults()),
  searchTopRatedResults: () => dispatch(getTopRatedResults()),
  searchCustomResults: (searchString) => dispatch(getCustomResults(searchString)),
})

const propTypes = {
  loading: PropTypes.bool,
  results: PropTypes.object.isRequired,
  searchPopularResults: PropTypes.func.isRequired,
  searchTopRatedResults: PropTypes.func.isRequired,
  searchCustomResults: PropTypes.func.isRequired,
}

const App = ({
  loading,
  results,
  searchPopularResults,
  searchTopRatedResults,
  searchCustomResults
}) => {
  const [currentResultType, setCurrentResultType] = useState(resultTypes.popular);

  useEffect(() => {
    searchPopularResults();
  }, [])

  const renderCards = () => (
    results[currentResultType].map((episode) => (
      <ResultsCol key = {episode.id} episode = {episode}/>
    ))
  )

  const handleNavBarSelection = (type, searchString) => {
    if(type === resultTypes.custom && !searchString) {
      setCurrentResultType(resultTypes.popular);
      return;
    }
    switch(type) {
      case resultTypes.popular:
        searchPopularResults();
        break;
      case resultTypes.topRated:
        searchTopRatedResults();
        break;
      case resultTypes.custom:
        searchCustomResults(searchString)
    }
    setCurrentResultType(type);
  };

  const renderNoResults = () => (
    <div className="no-results">
      <h2>No Results</h2>
    </div>
  );

  return (
    <div style = {{textAlign: 'center'}}>
      <AppBar searchHandler={handleNavBarSelection} />
      <Search
        currentResultType={currentResultType}
        searchHandler={handleNavBarSelection}
      />
      <Container>
        <Row style={{ justifyContent: 'center' }}>
          {results[currentResultType].length > 0 ? 
            renderCards() :
            renderNoResults()
          }
        </Row>
      </Container>
    </div>
  )
}
App.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(App);
