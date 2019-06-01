import React from 'react';
import {Card, Button, Col, Collapse} from 'react-bootstrap';
import RandomGen from './RandomGen.js';
class ResultsCol extends React.Component{
  constructor(props){
    super(props);

    this.state = {open: false};

    this.onClick = this.onClick.bind(this);
    this.visitShowPage = this.visitShowPage.bind(this);
  }

  //Changes the state to open to display the generated episode
  onClick(id){
    let stateArray = this.state.buttons;
    stateArray.forEach((button) => {
      if(button.id === id){
        button.open = true;
      }
    });
    this.setState({buttons: stateArray});
  }

  //Opens new tab to a description page
  visitShowPage(){
    const newPage = "https://www.themoviedb.org/tv/" + this.props.episode.id + "?language=en-US"
    window.open(newPage);
  }
  
  
  render(){
      const tvIdString = (this.props.episode.id).toString();
        return <Col xs={4} style = {{paddingBottom: '10px'}}>
          <Card>
          <Card.Img onClick = {this.visitShowPage} style = {{width: '100%', height: '400px'}} variant="top" src = {this.props.episode.tvImg}/>
          <Card.Body>
            <Card.Title>{this.props.episode.name} ({this.props.episode.year})</Card.Title>
            
            <Button 
            id = {tvIdString} 
            variant="outline-secondary" 
            onClick = {() => {this.setState({open: !this.state.open}); }}
            style = {{width: '100%', marginLeft: 'auto', marginRight:'auto', marginBottom: '10px'
            }}>
              Random Episode
            </Button>

            <Collapse id = {tvIdString} in={this.state.open} >
              <div >
                <RandomGen buttonId = {tvIdString} title = {this.props.episode.name}/>
              </div>
            </Collapse>

          </Card.Body>
        </Card>
      </Col>
    }
}

export default ResultsCol;