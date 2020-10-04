import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, InputGroup, FormControl } from 'react-bootstrap';
import './styles/search.css';

const propTypes = {
  searchHandler: PropTypes.func.isRequired,
  currentResultType: PropTypes.string.isRequired,
};

const debounceSearch = (func, duration) => {
  let debounceTimeout;
  return (value) => {
    if(debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(func.bind(this, value), duration)
  }
};


const Search = ({
  searchHandler,
  currentResultType,
}) => {
  const inputRef = useRef(null);
  /**
   * Reset the search bar if another filter option is selected
   */
  useEffect(() => {
    if (currentResultType !== 'custom' && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [currentResultType]);


  const handleDebounceSearch = debounceSearch((value) => {
    searchHandler('custom', value);
  }, 250);

  const onSearch = (e) => {
    const { value } = e.target;
    handleDebounceSearch(value);
  }

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
            onChange={onSearch}
            ref={inputRef}
          />
        </InputGroup>
      </Card.Body>
    </Card>
  );
};
Search.propTypes = propTypes;
export default Search;
