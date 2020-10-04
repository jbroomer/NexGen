import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import RandomGen from './random-gen';
import './styles/result-card.css';

const propTypes = {
  episode: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    year: PropTypes.string,
    imgPath: PropTypes.string,
  }).isRequired,
};

/**
 * Returns a bootstrap column component containing all card media required
 * to generate a random epidsoe. Also, hooks up link to redirect to show info
 * on movie database website
 */
const ResultCard = ({
  episode,
}) => {
  const {
    id, imgPath,
  } = episode;
  // Opens new tab to a description page
  const visitShowPage = () => {
    const newPage = `https://www.themoviedb.org/tv/${id}?language=en-US`;
    window.open(newPage);
  };

  return (
    <Card>
      <Card.Img
        className="card-image card-image-animation"
        onClick={visitShowPage}
        variant="top"
        src={imgPath}
        alt="Background Image"
      />
      <Card.Body className="card-body">
        <RandomGen buttonId={id.toString()} />
      </Card.Body>
    </Card>
  );
};

ResultCard.propTypes = propTypes;
export default ResultCard;
