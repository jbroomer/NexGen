import React from 'react';
import { Card, InputGroup, FormControl } from 'react-bootstrap';
import './styles/search.css';
const Search = ({
  searchHandler
}) => (
  <Card className="search">
    <Card.Body className="search-input">
    <InputGroup size="md" >
      <InputGroup.Prepend>
        <InputGroup.Text id="inputGroup-sizing-md">Search</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        id="customSearch" 
        placeholder="Enter Search Term"
        aria-label="Enter Search Term"
        onChange = {searchHandler}
      />
    </InputGroup>
    </Card.Body>
  </Card>
)

export default Search;