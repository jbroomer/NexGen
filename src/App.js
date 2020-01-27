import React from 'react';
import { Row, Container } from 'react-bootstrap';
import ResultsCol from './Components/results-col';
import AppBar from './Components/app-bar';
import Search from './Components/search';
import $ from 'jquery';
import './App.css';

const key = 'api_key=6e8556079c0e1a842e60fdb88680228f';

class App extends React.Component{
  constructor(props){
    super(props);

    this.searchHandler = this.searchHandler.bind(this);
    this.renderNoResults = this.renderNoResults.bind(this);

    this.state = {
      tvCards: [], 
    };
    
  }

  componentDidMount() {
    this.performSearch(`https://api.themoviedb.org/3/tv/popular?${key}&language=en-US`)
  }

  //Accepts argument from search and concatenates to query URL
  searchHandler(e){
    e.preventDefault();
    //If the search value is empty reset the state and display the most popular
    if(e.target.value === ''){
      this.setState({tvCards: []});
      const popularUrl = `https://api.themoviedb.org/3/tv/popular?${key}&language=en-US`;
      this.performSearch(popularUrl);
    }
    //If the user is typing in a custom search concatenate to query URL
    else if(e.target.id === "customSearch"){
      const urlString = `https://api.themoviedb.org/3/search/tv?${key}&language=en-US&query=` + e.target.value;
      this.performSearch(urlString);
    }
    //If the user selects the Popular link in the nav clear the current results\search input and display most popular
    else if(e.target.className === "popular nav-link"){
      document.getElementById("customSearch").value = "";
      this.forceUpdate();
      const popularUrl = `https://api.themoviedb.org/3/tv/popular?${key}&language=en-US`;
      this.performSearch(popularUrl);
    }
    else if(e.target.className === "topRated nav-link"){
      document.getElementById("customSearch").value = "";
      this.forceUpdate();
      const topRatedUrl = `https://api.themoviedb.org/3/tv/top_rated?${key}&language=en-US`;
      this.performSearch(topRatedUrl);
    }
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
        console.log(err);
      }
    });
  }

  renderNoResults = () => (
    <div className="no-results">
      <h2>No Results</h2>
    </div>
  );

  render(){
    return<div style = {{textAlign: 'center'}}>
      <AppBar searchHandler={this.searchHandler} />
      <Search searchHandler={this.searchHandler} />
      <Container>
        <Row>
        {this.state.tvCards.length > 0 ? this.state.tvCards : this.renderNoResults()}
        </Row>
      </Container>
    </div>
  }
}

export default App;
