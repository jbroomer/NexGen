import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClickAwayListener, Grid } from '@mui/material';
import { TVShowListTypes } from '../@types';
import { useTVShowResults } from '../hooks/useTVShowResults';
import { ResultRow } from './result-card/result-row';
import LoadingIndicator from './loading-indicator';
import { RootState } from '../redux/reducers';
import { clearActiveTVShow } from '../redux/actions';

type Props = {
  currentResultType: TVShowListTypes;
};

const ResultsContainer = ({ currentResultType }: Props) => {
  const isLoading = useSelector((state: RootState) => state.loading);
  const dispatch = useDispatch();
  const tvShowResults = useTVShowResults(currentResultType);

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
