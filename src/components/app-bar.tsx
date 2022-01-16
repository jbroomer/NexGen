import React from 'react';
import { css } from '@emotion/react';
import { AppBar, Container, Toolbar, Box, Button, Typography } from '@mui/material';
import { TVShowListTypes } from '../@types';

const appBarButton = (selected: boolean) => css`
  text-decoration: ${selected ? 'underline' : 'none'};
`;

type Props = {
  searchHandler: (a: TVShowListTypes, b?: string) => void;
  currentResultType: TVShowListTypes;
  setCurrentResultType: (a: TVShowListTypes) => void;
};

const NavBar = ({ searchHandler, currentResultType, setCurrentResultType }: Props) => {
  const searchPopular = () => {
    setCurrentResultType(TVShowListTypes.POPULAR);
    searchHandler(TVShowListTypes.POPULAR);
  };

  const searchTopRated = () => {
    setCurrentResultType(TVShowListTypes.TOP_RATED);
    searchHandler(TVShowListTypes.TOP_RATED);
  };

  return (
    <AppBar position="relative">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography sx={{ marginRight: '20px' }} variant="h4" color="secondary">
            NexGen
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Button
              css={appBarButton(currentResultType === TVShowListTypes.POPULAR)}
              size="large"
              color="secondary"
              onClick={searchPopular}
            >
              Popular
            </Button>
            <Button
              css={appBarButton(currentResultType === TVShowListTypes.TOP_RATED)}
              size="large"
              color="secondary"
              onClick={searchTopRated}
            >
              Top Rated
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
