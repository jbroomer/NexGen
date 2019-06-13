import React from 'react';
import {Card, Button, Col, Collapse} from 'react-bootstrap';
import RandomGen from './RandomGen.js';
class ResultsCol extends React.Component{
  constructor(props){
    super(props);

    this.state = {open: false};

    this.visitShowPage = this.visitShowPage.bind(this);
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
            <div >
                <RandomGen buttonId = {tvIdString} title = {this.props.episode.name}/>
            </div>
          </Card.Body>
        </Card>
      </Col>
    }
}

export default ResultsCol;