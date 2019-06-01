import React from 'react';
import {Navbar, Nav, Row, Container, Card, InputGroup, FormControl} from 'react-bootstrap';
import ResultsCol from './ResultsCol.js';
import $ from 'jquery';

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {};
    //this.performSearch = this.performSearch.bind(this);
    
    //this.performSearch();
    this.searchHandler = this.searchHandler.bind(this);
    this.performSearch("https://api.themoviedb.org/3/tv/popular?api_key=6e8556079c0e1a842e60fdb88680228f&language=en-US&page=1")
  }


  searchHandler(e){
    e.preventDefault();
    if(e.target.value === ''){
      this.setState({tvCards: []});
      const popularUrl = "https://api.themoviedb.org/3/tv/popular?api_key=6e8556079c0e1a842e60fdb88680228f&language=en-US&page=1";
      this.performSearch(popularUrl);
    }
    if(e.target.id === "customSearch"){
      const urlString = "https://api.themoviedb.org/3/search/tv?api_key=6e8556079c0e1a842e60fdb88680228f&language=en-US&query=" + e.target.value;
      this.performSearch(urlString);
    }
    else if(e.target.className === "nav-link"){
      document.getElementById("customSearch").value = "";
      this.forceUpdate();
      const popularUrl = "https://api.themoviedb.org/3/tv/popular?api_key=6e8556079c0e1a842e60fdb88680228f&language=en-US&page=1";
      this.performSearch(popularUrl);
      
    }
    
    
  }

 performSearch(searchTerm){
    
    var tvArray = [];

    $.ajax({
      url: searchTerm,
      success: (searchResults) => {
        const results = searchResults.results;
        
        results.forEach((episode) => {
          if(episode.poster_path != null){
          episode.tvImg = "https://image.tmdb.org/t/p/w500" + episode.poster_path;
          episode.year = episode.first_air_date.substring(0,4);
          const nextCard = <ResultsCol key = {episode.id} episode = {episode}/>
          tvArray.push(nextCard);
          }
        })
      
      
        this.setState({tvCards: tvArray});
      },
      error: (xhr, status, err) => {

      }
    });
  }
    
  //   fetch(urlString)
  //   .then(function(response) {
  //     return response.json();
  //   })
  //   .then(function(data) {
  //     const episodes = (data.results);
      
  //     episodes.forEach(function(episode) {
  //       var nextCard = <ResultsCol episode = {episode}/>
  //       tvArray.push(nextCard);
  //     });
  //   });
  //   return tvArray;
  // }

  render(){
    return<div>
      <Navbar bg="light" expand="lg" style = {{marginBottom: '20px'}}>
        <Navbar.Brand href="#home">NexGen</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id = "popular">
          <Nav id = "popular" className="mr-auto">
            <Nav.Link id = "popular" onClick = {this.searchHandler}>Popular</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Card style = {{width: '800px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px'}}>
        <Card.Body>
        <InputGroup size="md" >
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-md">Search</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl id = "customSearch" placeholder="Enter Search Term" aria-label="Enter Search Term" onChange = {this.searchHandler}/>
        </InputGroup>
        </Card.Body>
      </Card>
      
      <Container>
        <Row>
        {this.state.tvCards}
        </Row>
      </Container>      

    </div>
  }


}

export default App;
