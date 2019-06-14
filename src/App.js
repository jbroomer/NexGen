import React from 'react';
import {Navbar, Nav, Row, Container, Card, InputGroup, FormControl} from 'react-bootstrap';
import ResultsCol from './Components/ResultsCol.js';
import $ from 'jquery';



class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {tvCards: [], noResultsDiv: (<div></div>)};
    
    this.searchHandler = this.searchHandler.bind(this);
    this.noResults = this.noResults.bind(this);
    this.performSearch("https://api.themoviedb.org/3/tv/popular?api_key=6e8556079c0e1a842e60fdb88680228f&language=en-US")
  }

   noResults = () => {
    if(this.state.tvCards.length > 0){
      this.setState({noResultsDiv: <div></div>});
    }
    else{
    console.log("in here");
    console.log(this.state.tvCards.length);
      this.setState({noResultsDiv: 
        (<div style = {{width: '50%', marginLeft: 'auto', marginRight:'auto', marginTop:'250px', marginBottom:'auto'}}>
          <h2>No Results</h2>
          </div>)
      });
    }
  }

  //Accepts argument from search and concatenates to query URL
  searchHandler(e){
    e.preventDefault();
    console.log(e.target);
    //If the search value is empty reset the state and display the most popular
    if(e.target.value === ''){
      this.setState({tvCards: []});
      const popularUrl = "https://api.themoviedb.org/3/tv/popular?api_key=6e8556079c0e1a842e60fdb88680228f&language=en-US";
      this.performSearch(popularUrl);
    }
    //If the user is typing in a custom search concatenate to query URL
    else if(e.target.id === "customSearch"){
      const urlString = "https://api.themoviedb.org/3/search/tv?api_key=6e8556079c0e1a842e60fdb88680228f&language=en-US&query=" + e.target.value;
      this.performSearch(urlString);
    }
    //If the user selects the Popular link in the nav clear the current results\search input and display most popular
    else if(e.target.className === "popular nav-link"){
      document.getElementById("customSearch").value = "";
      this.forceUpdate();
      const popularUrl = "https://api.themoviedb.org/3/tv/popular?api_key=6e8556079c0e1a842e60fdb88680228f&language=en-US";
      this.performSearch(popularUrl);
    }
    else if(e.target.className === "topRated nav-link"){
      document.getElementById("customSearch").value = "";
      this.forceUpdate();
      const topRatedUrl = "https://api.themoviedb.org/3/tv/top_rated?api_key=6e8556079c0e1a842e60fdb88680228f&language=en-US";
      this.performSearch(topRatedUrl);
    }
    setTimeout(()=>{console.log(this.state.tvCards);
      this.noResults();}, 100)
  }

//Makes call to The Movie Database API using jquery and AJAX
 performSearch(searchTerm){
    var tvArray = [];
    $.ajax({
      url: searchTerm,
      success: (searchResults) => {
        const results = searchResults.results;
        //Loop through the results and create a <ResultsCol> for each episode and push to the tvArray
        results.forEach((episode) => {
          if(episode.poster_path != null){
          episode.tvImg = "https://image.tmdb.org/t/p/w500" + episode.poster_path;
          episode.year = episode.first_air_date.substring(0,4);
          const nextCard = <ResultsCol key = {episode.id} episode = {episode}/>
          tvArray.push(nextCard);
          }
        })
      
        //Add all of the result cards to the state
        this.setState({tvCards: tvArray});
      },
      error: (xhr, status, err) => {
        
      }
    });
  }

  render(){
    return<div style = {{textAlign: 'center'}}>
      <Navbar bg="light" expand="lg" style = {{marginBottom: '20px'}}>
        <Navbar.Brand href="#home">NexGen</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id = "popular">
          <Nav id = "popular" className="mr-auto">
            <Nav.Link className = "popular" onClick = {this.searchHandler}>Popular</Nav.Link>
            <Nav.Link className = "topRated" onClick = {this.searchHandler}>Top Rated</Nav.Link>
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
        {this.state.noResultsDiv}
        </Row>
      </Container>
    </div>
  }
}

export default App;
