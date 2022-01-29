import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { Card, CardMedia, Skeleton } from '@mui/material';
import { detect } from 'detect-browser';
import { FilteredTVShowResults } from '../../@types';
import { RootState } from '../../redux/reducers';
import { clearActiveTVShow, retrieveAndSetActiveTVShow } from '../../redux/actions';
import RandomEpisodeGenerator from './random-episode-generator';

const DEFAULT_CARD_HEIGHT = '315px';
const DEFAULT_CARD_WIDTH = '200px';
const ACTIVE_CARD_HEIGHT = '410px';
const ACTIVE_CARD_WIDTH = '260px';

const cardContainer = (active: boolean) => css`
  display: flex;
  margin: 10px;
  margin-top: auto;
  height: ${active ? ACTIVE_CARD_HEIGHT : DEFAULT_CARD_HEIGHT};
  width: ${active ? ACTIVE_CARD_WIDTH : DEFAULT_CARD_WIDTH};
  transition-property: height, width;
  transition-duration: 0.5s;
`;

const cardMediaStyles = (isLoading: boolean) => css`
  height: 100%;
  cursor: pointer;
  object-fit: fill;
  visibility: ${isLoading ? 'hidden' : 'visible'};
  display: ${isLoading ? 'none' : 'block'};
`;

type Props = {
  tvShow: FilteredTVShowResults;
};

const CardContainer = ({ tvShow }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);

  /** Redux Stuff Start */
  const activeShow = useSelector((state: RootState) => state.activeShow);
  const dispatch = useDispatch();
  /** Redux Stuff End */

  const isActive = activeShow?.id === tvShow.id;

  useEffect(() => {
    if (tvShow.imgPath) {
      setIsLoading(true);
    }
  }, [tvShow.imgPath]);

  const triggerActiveCard = useCallback(
    (e: React.MouseEvent<HTMLImageElement> | React.KeyboardEvent<HTMLElement>) => {
      if (!isActive) {
        dispatch(retrieveAndSetActiveTVShow(tvShow));

        // Smooth scrolling doesn't work on safari and is jarring without it
        if (detect()?.name !== 'safari') {
          // @ts-ignore Property is not documented on HTMLElement
          e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      dispatch(clearActiveTVShow());
    },
    [dispatch, isActive, tvShow]
  );

  const handleCardClick = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      triggerActiveCard(e);
    },
    [triggerActiveCard]
  );

  const onTransitionEnd = () => {
    setShowOverlay(isActive);
  };

  useEffect(() => {
    if (!isActive) {
      setShowOverlay(false);
    }
  }, [isActive]);

  const onEnterKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    switch (e.key) {
      case 'Enter':
        triggerActiveCard(e);
        break;
      case 'Escape':
        dispatch(clearActiveTVShow());
        break;
      default:
        break;
    }
  };

  return (
    <Card
      tabIndex={0}
      onTransitionEnd={onTransitionEnd}
      onClick={handleCardClick}
      css={cardContainer(isActive)}
      onKeyDown={onEnterKeyDown}
      aria-label={tvShow.name}
    >
      {isLoading && (
        <Skeleton variant="rectangular" height={DEFAULT_CARD_HEIGHT} width={DEFAULT_CARD_WIDTH} />
      )}
      <CardMedia
        onLoad={() => setIsLoading(false)}
        component="img"
        css={cardMediaStyles(isLoading)}
        image={tvShow.imgPath}
        title={tvShow.name}
        alt={`${tvShow.name} Poster Image`}
      />
      {showOverlay && <RandomEpisodeGenerator />}
    </Card>
  );
};

export default CardContainer;
