import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav } from 'react-bootstrap';
import resultTypes from './utils/resultTypeMap';

const propTypes = {
  searchHandler: PropTypes.func.isRequired,
};

const AppBar = ({
  searchHandler,
}) => (
  <Navbar bg="light" expand="lg" style={{ marginBottom: '20px' }}>
    <Navbar.Brand>NexGen</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="popular">
      <Nav id="popular" className="mr-auto">
        <Nav.Link className="popular" onClick={() => { searchHandler(resultTypes.popular); }}>Popular</Nav.Link>
        <Nav.Link className="topRated" onClick={() => { searchHandler(resultTypes.topRated); }}>Top Rated</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

AppBar.propTypes = propTypes;
export default AppBar;
