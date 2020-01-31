import React from 'react';
import { Card, Col } from 'react-bootstrap';
import RandomGen from './random-gen';
import PropTypes from 'prop-types';
import './styles/results-col.css';
/**
 * Returns a bootstrap column component containing all card media required
 * to generate a random epidsoe. Also, hooks up link to redirect to show info
 * on movie database website
 */

const propTypes = {
  episode: PropTypes.object.isRequired, // { id, name, year }
};

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

  componentDidMount = () => {
    // Listens to page resize to change column size and adapt to mobile screen
    this.resizeListener = window.addEventListener('resize', this.updateSize);
  }

  componentWillUnmount = () => {
    // Remove handles and event listeners
    clearTimeout(this.resizeTimout);
    delete this.resizeTimout;
    window.removeEventListener('resize', this.updateSize);
  }

  //Opens new tab to a description page
  visitShowPage = () => {
    const newPage = "https://www.themoviedb.org/tv/" + this.props.episode.id + "?language=en-US"
    window.open(newPage);
  }

  // Screen size state handler
  updateSize = () => {
    if(!this.state.resizing) {
      this.setState({ resizing: true, screen: window.screen.width });
      this.resizeTimout = setTimeout(() => {
        this.setState({ resizing: false });
      }, 1000)
    }
  }
  
  render(){
    const { id, name, year, tvImg} = this.props.episode;
    const tvIdString = (id).toString();
      return (
        <Col className="column" xs={window.screen.width > 900 ? 3 : 6}>
          <Card>
            <Card.Img
              className="card-image"
              onClick = {this.visitShowPage} 
              variant="top" 
              src={tvImg}
            />
            <Card.ImgOverlay>
              {name} ({year})
            </Card.ImgOverlay>
            <Card.Body className="card-body">
              <RandomGen buttonId = {tvIdString} title = {name}/>
            </Card.Body>
          </Card>
        </Col>
      );
  }
}
ResultsCol.propTypes = propTypes;
export default ResultsCol;