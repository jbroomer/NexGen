import React, { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './styles/random-gen.css';

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
};

const RandomGen = ({
  buttonId,
}) => {
  const [numSeasons, setNumSeasons] = useState(null);
  const [randomSeason, setRandomSeason] = useState(1);
  const [randomEpisode, setRandomEpisode] = useState(1);
  const [displayButton, setDisplayButton] = useState(true);

  const getRandomGen = (num) => Math.floor(Math.random() * (num)) + 1;

  // Retrieves the number of episodes in the provided season
  const getEpisodeDetails = (season) => {
    const urlString = `https://api.themoviedb.org/3/tv/${buttonId}/season/${season}?api_key=6e8556079c0e1a842e60fdb88680228f`;
    fetch(urlString)
      .then((response) => response.json())
      .then((searchResults) => {
        const numEpisodes = (searchResults.episodes.length);
        console.log('Episodes: ', numEpisodes);
        setRandomEpisode(getRandomGen(numEpisodes));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // Retrieves the number of seasons in the selected episode
  const getSeasonDetails = () => {
    const urlString = `https://api.themoviedb.org/3/tv/${buttonId}?api_key=6e8556079c0e1a842e60fdb88680228f`;
    return fetch(urlString)
      .then((response) => response.json())
      .then((searchResults) => {
        setNumSeasons(searchResults.number_of_seasons,
          setRandomSeason(getRandomGen(numSeasons)));
        console.log('Seasons: ', numSeasons);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  // Changes the state to open to display the generated episode
  const onRandomButtonClick = () => {
    if (!numSeasons) {
      getSeasonDetails().then(() => {
        getEpisodeDetails(randomSeason);
      });
    } else {
      setRandomSeason(getRandomGen(numSeasons));
      getEpisodeDetails(randomSeason);
    }
    setDisplayButton(false);
  };

  const renderRandomButtom = () => (
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

  return (
    <div style={{ textAlign: 'center' }}>
      {renderRandomButtom()}
      <Collapse id={buttonId} in={!displayButton}>
        <div className="random-episode-text">
          {`Season: ${randomSeason} Episode: ${randomEpisode}`}
          <Button variant="outline-secondary" onClick={onRandomButtonClick}>
            <img alt="refresh" src="refresh.png" className="refresh-button" />
          </Button>
        </div>
      </Collapse>
    </div>
  );
};

RandomGen.propTypes = propTypes;
export default RandomGen;
