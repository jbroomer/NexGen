import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'react-bootstrap';
import ResultCard from './result-card';
import './styles/results-container.css';

const propTypes = {
  results: PropTypes.shape([]).isRequired,
  currentResultType: PropTypes.string.isRequired,
};

const ResultsContainer = ({
  results,
  currentResultType,
}) => {
  // Render card results if there are any
  const renderCards = () => (
    results[currentResultType].map((episode) => (
      <Col key={episode.id} className="column" xs={window.screen.width > 900 ? 3 : 9}>
        <ResultCard episode={episode} />
      </Col>
    ))
  );

  return (
    <Container>
      <Row className="results-container__row">
        {renderCards()}
      </Row>
    </Container>
  );
};
ResultsContainer.propTypes = propTypes;
export default ResultsContainer;
