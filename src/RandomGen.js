import React from 'react';
import $ from 'jquery';
import {Button, Collapse} from 'react-bootstrap';

class RandomGen extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {season: 1, episode: 1, open: false};
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
        $.ajax({
          url: urlString,
          success: (searchResults) => {
            console.log("Searching...2");
            const numSeason = (searchResults.number_of_seasons);
            const randomSeason = Math.floor(Math.random() * (+(numSeason+1) - +1)) + + 1;
          
            this.setState({season: randomSeason});
        },
          error: (xhr, status, err) => {
            console.log(err);
          }
        });
      }

      //Retrieves the number of episodes in the provided season
    getEpisodeDetails(){
        const urlString = "https://api.themoviedb.org/3/tv/" + this.props.buttonId + "/season/" + (this.state.season) + "?api_key=6e8556079c0e1a842e60fdb88680228f";
        
        let randomEpisode;
        $.ajax({
          url: urlString,
          success: (searchResults) => {
            console.log("Searching...3");
            const numEpisodes = (searchResults.episodes.length);
            randomEpisode = Math.floor(Math.random() * (+(numEpisodes+1) - +1)) + + 1;
            this.setState({episode: randomEpisode});
        },
          error: (xhr, status, err) => {
            console.log(err);
          }
        });
    }


    render(){ 
        return (
        <div style = {{textAlign: 'center'}}>
            
            <Button 
                id = {this.props.buttonId} 
                variant="outline-secondary" 
                onClick = {() => {this.setState({open: !this.state.open}); this.getSeasonDetails(); this.getEpisodeDetails();}}
                style = {{width: '100%', marginLeft: 'auto', marginRight:'auto', marginBottom: '10px'
                }}>
                    Random Episode
            </Button>
            
            <Collapse id = {this.props.buttonId} in={this.state.open} >
                <div>
                    Season: {this.state.season} Episode: {this.state.episode}

                    <img alt = 'refresh' src = './refresh.png' style = {{width: '25px', marginLeft: '20px'}} onClick = {() => {
                        this.getSeasonDetails();
                        this.getEpisodeDetails();
                    }}/>
                </div>
            </Collapse>
        </div>
        )
    }
}

export default RandomGen;