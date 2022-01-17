import { Grid } from '@mui/material';
import React from 'react';
import { FilteredTVShowResults } from '../../@types';
import { useScreenSize, ScreenSizes } from '../../hooks/useScreenSize';
import CardContainer from './card-container';

type Props = {
  resultRow: FilteredTVShowResults[];
};

export const ResultRow = ({ resultRow }: Props) => {
  const screenSizeLabel = useScreenSize();
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      width={screenSizeLabel === ScreenSizes.SMALL ? 'auto' : 'max-content'}
    >
      {resultRow.map((result) => (
        <CardContainer tvShow={result} key={result.id} />
      ))}
    </Grid>
  );
};
