import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, InputGroup, FormControl } from 'react-bootstrap';
import './styles/search.css';

const propTypes = {
  searchHandler: PropTypes.func.isRequired,
  currentResultType: PropTypes.string.isRequired,
};

const Search = ({
  searchHandler,
  currentResultType,
}) => {
  const [searchString, setSearchString] = useState('');
  /**
   * Reset the search bar if another filter option is selected
   */
  useEffect(() => {
    if (currentResultType !== 'custom') {
      setSearchString('');
    }
  }, [currentResultType]);

  const onSearchChange = (e) => {
    setSearchString(e.target.value);
    searchHandler('custom', e.target.value);
  };

  return (
    <Card className="search">
      <Card.Body className="search-input">
        <InputGroup size="md">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-md">Search</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            id="customSearch"
            placeholder="Enter Search Term"
            aria-label="Enter Search Term"
            value={searchString}
            onChange={onSearchChange}
          />
        </InputGroup>
      </Card.Body>
    </Card>
  );
};
Search.propTypes = propTypes;
export default Search;
