import React, { Suspense } from 'react';
import { css } from '@emotion/react';
import AppBar from './components/nav-bar';
import SearchBar from './components/search-bar';

const ResultsContainer = React.lazy(() => import('./components/results-container'));

const searchBarContainer = css`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 20px 0px;
`;

const App = () => (
  <div>
    <AppBar />
    <div css={searchBarContainer}>
      <SearchBar />
    </div>
    <Suspense fallback={<div />}>
      <ResultsContainer />
    </Suspense>
  </div>
);
export default App;
