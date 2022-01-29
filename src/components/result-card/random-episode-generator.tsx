import React, { useState, useCallback, useRef, useEffect } from 'react';
import { css } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { RootState } from '../../redux/reducers';
import { clearActiveTVShow } from '../../redux/actions';

const container = css`
  position: absolute;
  width: inherit;
  height: inherit;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const titleContainer = (containsSpaces: boolean) => css`
  flex-shrink: 1;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: ${containsSpaces ? 'break-word' : 'break-all'};
  margin: 10px;
`;

const descriptionContainer = css`
  flex: 3;
  text-align: center;
`;

const descriptionText = css`
  overflow: hidden;
  padding: 0px 10px;
  display: -webkit-box;
  -webkit-line-clamp: 9;
  -webkit-box-orient: vertical;
`;

const randomEpisodeContainer = css`
  display: flex;
  flex: 0.5;
  width: 50%;
  justify-content: space-evenly;
`;

const randomEpisodeButtonContainer = css`
  flex: 1;
  display: flex;
  flex-shrink: 1;
`;

const randomEpisodeButton = css`
  margin: auto;
`;

const closeButton = css`
  position: absolute;
  right: -8px;
  top: -8px;
  &:focus {
    svg {
      outline: 1px solid white;
    }
  }
`;

type RandomEpisode = {
  season: number;
  episode: number;
};

// Helper function to generate random number
const getRandomNumber = (max: number): number => Math.floor(Math.random() * max);

// Helper function to format number with two digits
const formatNumberString = (num: number): string => {
  const numberString = num.toString();
  return numberString.length >= 2 ? numberString : `0${numberString}`;
};

const RandomEpisodeGenerator = () => {
  const [randomEpisode, setRandomEpisode] = useState<RandomEpisode>({ season: 0, episode: 0 });
  const randomButtonRef = useRef<HTMLElement>();

  /** Redux Stuff Start */
  const activeShow = useSelector((state: RootState) => state.activeShow);
  const seasonDetails = useSelector((state: RootState) =>
    state.activeShow ? state.seasonsById[state.activeShow.id] : null
  );
  const dispatch = useDispatch();
  /** Redux Stuff End */

  // Capture click events on overlay to prevent setting the card as inactive
  const onOverlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const generateRandomEpisode = () => {
    if (seasonDetails) {
      const season = seasonDetails[getRandomNumber(seasonDetails.length - 1)];
      const randomEpisodeNumber = getRandomNumber(season.episode_count - 1) + 1;
      setRandomEpisode({ season: season.season_number, episode: randomEpisodeNumber });
    }
  };

  const handleClose = useCallback(() => {
    dispatch(clearActiveTVShow());
  }, [dispatch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key !== 'Escape') {
      e.stopPropagation();
    }
  };

  // Autofocus random button
  useEffect(() => {
    if (randomButtonRef.current) {
      randomButtonRef.current.focus();
    }
  }, []);

  return (
    activeShow && (
      <div onKeyDown={handleKeyDown} css={container} onClick={onOverlayClick} role="none">
        <IconButton disableRipple css={closeButton} onClick={handleClose} color="primary">
          <CloseIcon />
        </IconButton>
        <div css={titleContainer(activeShow.name.includes(' '))}>
          <Typography variant="h5" color="primary" title={activeShow.name}>
            {activeShow.name}
          </Typography>
        </div>
        <div css={descriptionContainer}>
          <Typography css={descriptionText} color="primary" title={activeShow.overview}>
            {activeShow.overview}
          </Typography>
        </div>
        <div css={randomEpisodeContainer}>
          <Typography variant="h6" color="primary">
            S: {randomEpisode.season ? formatNumberString(randomEpisode.season) : '00'}
          </Typography>
          <Typography variant="h6" color="primary">
            E: {randomEpisode.episode ? formatNumberString(randomEpisode.episode) : '00'}
          </Typography>
        </div>
        <div css={randomEpisodeButtonContainer}>
          {/* @ts-ignore */}
          <Button
            ref={randomButtonRef}
            onClick={generateRandomEpisode}
            css={randomEpisodeButton}
            variant="contained"
            aria-label="Close Card"
          >
            Random Episode
          </Button>
        </div>
      </div>
    )
  );
};

export default RandomEpisodeGenerator;
