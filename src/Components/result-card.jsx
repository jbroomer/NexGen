import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import RandomGen from './random-gen';
import './styles/results-col.css';
/**
 * Returns a bootstrap column component containing all card media required
 * to generate a random epidsoe. Also, hooks up link to redirect to show info
 * on movie database website
 */

const propTypes = {
  episode: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    year: PropTypes.string,
    img: PropTypes.string,
  }).isRequired,
};

const ResultCard = ({
  episode,
}) => {
  const {
    id, name, year, img,
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
        src={img}
      />
      <Card.ImgOverlay>
        {`${name} (${year})`}
      </Card.ImgOverlay>
      <Card.Body className="card-body">
        <RandomGen buttonId={id.toString()} />
      </Card.Body>
    </Card>
  );
};

ResultCard.propTypes = propTypes;
export default ResultCard;
