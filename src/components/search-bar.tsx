import React, { useEffect, useState, useCallback } from 'react';
import { css } from '@emotion/react';
import debounce from 'lodash/debounce';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { TVShowListTypes } from '../@types';
import { RootState } from '../redux/reducers';
import { getTvShowResults } from '../redux/actions';

const searchBar = css`
  width: 50vw;
  max-width: 500px;
  min-width: 300px;
  box-shadow: 0px 0px 0px 0px black;
`;

const Search = () => {
  const [searchValue, setSearchValue] = useState('');

  /** Redux Stuff Start */
  const currentResultType = useSelector((state: RootState) => state.currentResultType);
  const dispatch = useDispatch();
  /** Redux Stuff End */

  const handleSearch = (value: string) => dispatch(getTvShowResults(TVShowListTypes.CUSTOM, value));

  /**
   * Reset the search bar if another filter option is selected
   */
  useEffect(() => {
    if (currentResultType !== TVShowListTypes.CUSTOM) {
      setSearchValue('');
    }
  }, [currentResultType]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce((value) => {
      handleSearch(value);
    }, 250),
    [handleSearch]
  );

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    debounceSearch(value);
  };

  return (
    <TextField
      css={searchBar}
      label="Search for a TV show..."
      value={searchValue}
      onChange={onSearch}
      color="secondary"
    />
  );
};
export default Search;
