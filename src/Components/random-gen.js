import React from 'react';
import {Button, Collapse} from 'react-bootstrap';
import './styles/random-gen.css';

class RandomGen extends React.Component{
  constructor(props){
    super(props);
    this.getRandomGen = this.getRandomGen.bind(this);
    this.state = {
      season: 1,
      episode: 1,
      open: false
    };
  }
  //Changes the state to open to display the generated episode
  onClick(id){
    let stateArray = this.state.buttons;
    stateArray.forEach((button) => {
      if(button.id === this.props.episode.id){
        button.open = true;
      }
    });
    this.setState({buttons: stateArray});
  }

  //Retrieves the number of seasons in the selected episode
  getSeasonDetails(){
    const urlString = "https://api.themoviedb.org/3/tv/" + this.props.buttonId + "?api_key=6e8556079c0e1a842e60fdb88680228f";
    fetch(urlString)
    .then((response) => response.json())
    .then((searchResults) => {
      const numSeason = (searchResults.number_of_seasons);
      console.log("Season: " + numSeason);
      const randomSeason = this.getRandomGen(numSeason);
      this.getEpisodeDetails(randomSeason)
      this.setState({season: randomSeason});
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

    //Retrieves the number of episodes in the provided season
  getEpisodeDetails(season){
    const urlString = "https://api.themoviedb.org/3/tv/" + this.props.buttonId + "/season/" + (season) + "?api_key=6e8556079c0e1a842e60fdb88680228f";
    let randomEpisode;
    fetch(urlString)
    .then((response) => response.json())
    .then((searchResults) => {
      const numEpisodes = (searchResults.episodes.length);
      console.log("Episodes: " + numEpisodes)
      randomEpisode = this.getRandomGen(numEpisodes);
      this.setState({episode: randomEpisode});
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  getRandomGen = (num) => Math.floor(Math.random() * (num)) + 1;


  render(){ 
    return (
      <div style = {{textAlign: 'center'}}>
        <Button 
          id = {this.props.buttonId} 
          style={{ marginBottom: '10px'}}
          variant="outline-secondary" 
          onClick = {() => {
            if(this.state.open === false){
              this.getSeasonDetails();
            }
            this.setState({open: !this.state.open}); 
          }}
        >
          Random Episode
        </Button>
      <Collapse id = {this.props.buttonId} in={this.state.open} >
        <div className="random-episode-text">
          Season: {this.state.season} Episode: {this.state.episode}
          <img alt = 'refresh' src = './refresh.png' className="refresh-button" style = {{width: '25px', marginLeft: '20px'}} onClick = {() => {
            this.getSeasonDetails();
          }}/>
        </div>
      </Collapse>
    </div>
    )
  }
}

export default RandomGen;