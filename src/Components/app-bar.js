import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'; 

const AppBar = ({
  searchHandler
}) => (
    <Navbar bg="light" expand="lg" style = {{marginBottom: '20px'}}>
      <Navbar.Brand href="#home">NexGen</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id = "popular">
        <Nav id = "popular" className="mr-auto">
          <Nav.Link className = "popular" onClick = {searchHandler}>Popular</Nav.Link>
          <Nav.Link className = "topRated" onClick = {searchHandler}>Top Rated</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
);

export default AppBar;