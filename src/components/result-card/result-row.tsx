import { Grid } from '@mui/material';
import React from 'react';
import { FilteredTVShowResults } from '../../@types';
import CardContainer from './card-container';

type Props = {
  resultRow: FilteredTVShowResults[];
};

export const ResultRow = ({ resultRow }: Props) => (
  <Grid container direction="row" justifyContent="center" width="max-content">
    {resultRow.map((result) => (
      <CardContainer tvShow={result} key={result.id} />
    ))}
  </Grid>
);
