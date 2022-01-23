import React from 'react';
import { css } from '@emotion/react';
import { AppBar, Container, Toolbar, Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { TVShowListTypes } from '../@types';
import { RootState } from '../redux/reducers';
import { getTvShowResults } from '../redux/actions';

const appBarButton = (selected: boolean) => css`
  text-decoration: ${selected ? 'underline' : 'none'};
`;

const NavBar = () => {
  /** Redux Stuff Start */
  const currentResultType = useSelector((state: RootState) => state.currentResultType);
  const dispatch = useDispatch();
  /** Redux Stuff End */

  const searchPopular = () => dispatch(getTvShowResults(TVShowListTypes.POPULAR));
  const searchTopRated = () => dispatch(getTvShowResults(TVShowListTypes.TOP_RATED));

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
