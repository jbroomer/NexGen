import { Grid } from '@mui/material';
import React from 'react';
import { FilteredTVShowResults } from '../../@types';
import { useScreenSize } from '../../hooks/useScreenSize';
import CardContainer from './card-container';

type Props = {
  resultRow: FilteredTVShowResults[];
};

export const ResultRow = ({ resultRow }: Props) => {
  const { isMobile } = useScreenSize();
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      width={isMobile ? 'auto' : 'max-content'}
    >
      {resultRow.map((result) => (
        <CardContainer tvShow={result} key={result.id} />
      ))}
    </Grid>
  );
};
