import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import BoldTextDisplay from './bold-text-display';
import { refreshRandomEpisode } from '../redux/actions';
import './styles/random-gen.css';

const mapStateToProps = (state) => ({
  randomEpisodeById: state.get('randomEpisodeById'),
  isFetchingEpisode: state.get('isFetchingEpisode'),
});

const mapDispatchToProps = (dispatch) => ({
  updateRandomEpisode: (id) => dispatch(refreshRandomEpisode(id)),
});

// TODO
/**
 * Redux can handle retreiving the number of seasons and episodes. Before generatings,
 * check if there are seasons and episodes generated for the ID, if there are not then
 * make request and show some loading indicator, should only take < 0.5s. Then subsequent
 * random generations will be instantaneous as they will not need to be loaded in.
 *
 * In the future, with the option to save "Favorite" seasons, the saved data could come with
 * that information so it does not need to be handled in a subsequent request.
 */
const propTypes = {
  buttonId: PropTypes.string.isRequired,
  isFetchingEpisode: PropTypes.bool.isRequired,
  randomEpisodeById: PropTypes.shape({
    get: PropTypes.func,
  }).isRequired,
  updateRandomEpisode: PropTypes.func.isRequired,
};

const RandomGen = ({
  buttonId,
  isFetchingEpisode,
  randomEpisodeById,
  updateRandomEpisode,
}) => {
  const season = randomEpisodeById?.get(buttonId)?.season;
  const episode = randomEpisodeById?.get(buttonId)?.episode;

  const [displayButton, setDisplayButton] = useState(true);

  // Changes the state to open to display the generated episode
  const onRandomButtonClick = () => {
    updateRandomEpisode(buttonId);
    setDisplayButton(false);
  };

  const renderRandomButton = () => (
    displayButton
      ? (
        <Button
          id={buttonId}
          style={{ marginBottom: '10px' }}
          variant="outline-secondary"
          onClick={onRandomButtonClick}
        >
          Random Episode
        </Button>
      )
      : null
  );

  const renderRandomEpisode = () => (
    <div className="random-gen-container">
      <div className="random-episode-text">
        <BoldTextDisplay
          label="Season:"
          displayValue={season?.toString()}
        />
        <BoldTextDisplay
          label="Episode:"
          displayValue={episode?.toString()}
        />
      </div>
      <Button className="refresh-button" variant="light" onClick={onRandomButtonClick}>
        <img alt="refresh" src="assets/refresh.png" className="refresh-button-icon" />
      </Button>
    </div>
  );
  return (
    <div style={{ textAlign: 'center' }}>
      {displayButton || isFetchingEpisode
        ? renderRandomButton()
        : renderRandomEpisode()}
    </div>
  );
};

RandomGen.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(RandomGen);
