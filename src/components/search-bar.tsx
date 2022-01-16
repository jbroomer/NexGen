import React, { useEffect, useState, useCallback } from 'react';
import { css } from '@emotion/react';
import debounce from 'lodash/debounce';
import { TextField } from '@mui/material';
import { TVShowListTypes } from '../@types';

const searchBar = css`
  width: 50vw;
  max-width: 500px;
  box-shadow: 0px 0px 0px 0px black;
`;

type Props = {
  searchHandler: (a: TVShowListTypes, b?: string) => void;
  currentResultType: TVShowListTypes;
};

const Search = ({ searchHandler, currentResultType }: Props) => {
  const [searchValue, setSearchValue] = useState('');

  /**
   * Reset the search bar if another filter option is selected
   */
  useEffect(() => {
    if (currentResultType !== TVShowListTypes.CUSTOM) {
      setSearchValue('');
    }
  }, [currentResultType]);

  const debounceSearch = useCallback(
    debounce((value) => {
      searchHandler(TVShowListTypes.CUSTOM, value);
    }, 250),
    [searchHandler]
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
