import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClickAwayListener, Grid } from '@mui/material';
import { useTVShowResults } from '../hooks/useTVShowResults';
import { ResultRow } from './result-card/result-row';
import LoadingIndicator from './loading-indicator';
import { RootState } from '../redux/reducers';
import { clearActiveTVShow, getTvShowResults } from '../redux/actions';
import { TVShowListTypes } from '../@types';

const ResultsContainer = () => {
  const tvShowResults = useTVShowResults();

  /** Redux Stuff Start */
  const isLoading = useSelector((state: RootState) => state.loading);
  const dispatch = useDispatch();
  /** Redux Stuff End */

  // Get initial list on mount
  useEffect(() => {
    dispatch(getTvShowResults(TVShowListTypes.POPULAR));
  }, [dispatch]);

  // Clear active card on click away
  const handleClickAway = useCallback(() => {
    dispatch(clearActiveTVShow());
  }, [dispatch]);

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Grid container display="block" width="max-content" margin="auto">
        {tvShowResults.map((results, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ResultRow resultRow={results} key={`results-row-${index}`} />
        ))}
      </Grid>
    </ClickAwayListener>
  );
};
export default ResultsContainer;
