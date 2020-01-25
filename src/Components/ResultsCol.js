import React from 'react';
import { Card, Col } from 'react-bootstrap';
import RandomGen from './RandomGen.js';

class ResultsCol extends React.Component{
  constructor(props){
    super(props);
    this.visitShowPage = this.visitShowPage.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.state = {
      open: false,
      screen: window.screen.width,
      resizing: false,
    };
  }

  componentDidMount() {
    this.resizeListener = window.addEventListener('resize', this.updateSize);
  }

  componentWillUnmount() {
    clearTimeout(this.resizeTimout);
    delete this.resizeTimout;
    window.removeEventListener('resize', this.updateSize);
  }
  //Opens new tab to a description page
  visitShowPage(){
    const newPage = "https://www.themoviedb.org/tv/" + this.props.episode.id + "?language=en-US"
    window.open(newPage);
  }

  updateSize = () => {
    if(!this.state.resizing) {
      this.setState({ resizing: true, screen: window.screen.width });
      this.resizeTimout = setTimeout(() => {
        this.setState({ resizing: false });
      }, 1000)
    }
  }
  
  render(){
      const tvIdString = (this.props.episode.id).toString();
        return (
          <Col xs={this.state.screen > 900 ? 4 : 6} style = {{paddingBottom: '10px'}}>
            <Card>
            <Card.Img onClick = {this.visitShowPage} style = {{width: 'inherit', maxHeight: '300px'}} variant="top" src = {this.props.episode.tvImg}/>
            <Card.Body style={{ alignSelf: 'center' }}>
              <Card.Title>{this.props.episode.name} ({this.props.episode.year})</Card.Title>
                <RandomGen buttonId = {tvIdString} title = {this.props.episode.name}/>
            </Card.Body>
          </Card>
        </Col>
        )
    }
}

export default ResultsCol;