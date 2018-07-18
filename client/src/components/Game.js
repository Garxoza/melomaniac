import React, { Component } from 'react';
import axios from "axios";
import api from '../api';
import ReactAudioPlayer from 'react-audio-player';
import {Button, ButtonGroup} from 'reactstrap';

class Game extends Component {
  constructor(props){
    super(props)
    this.state = {
      game: null,
      index: null
    };
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }
  onRadioBtnClick(rSelected) {
    
    // this.setState({ rSelected }, {index} );
  }
  componentDidMount() {
    api.getGame()
    .then(game => {
      console.log("this is COMPONENTDIDMOUNT")
      console.log("Should be a track", game)
      this.setState({game})
    })
    .catch(err => console.log(err))
  }
  render() {
    if (!this.state.game)
      return "Loading..."

    console.log("this is this.state", this.state)
    console.log("this is RENDER")
    // console.log("this is Answer1", this.state.game.questions[0].answers[0].answer)
    
    
    let answer=this.state.game.questions && this.state.game.questions[0].answers[0].answer
    let answer2=this.state.game.questions && this.state.game.questions[0].answers[1].answer
    let answer3=this.state.game.questions && this.state.game.questions[0].answers[2].answer
    let answer4=this.state.game.questions && this.state.game.questions[0].answers[3].answer
    // let answer4=this.state.game.questions && this.state.game.questions[this.state.index].answers[3].answer
    let url=this.state.game.questions && this.state.game.questions[0].musicUrl
    console.log("MUSICURL", url)
    console.log("ANSWER", answer)
    console.log("TEST", this.state.questions && this.state.questions[0]);
    

    return (
      <div>
        <h2>Random Game</h2>

        <ReactAudioPlayer src={url} controls/> <br/><br/>
        <Button color="primary" onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1} >
          {answer}</Button><br/><br/>
        <Button color="primary" onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>
          {answer2}</Button><br/><br/>
        <Button color="primary" onClick={() => this.onRadioBtnClick(3)} active={this.state.rSelected === 3}>
          {answer3}</Button><br/><br/>
        <Button color="primary" onClick={() => this.onRadioBtnClick(4)} active={this.state.rSelected === 4} {...this.state.index+=1}>
          {answer4}</Button>
          <br/><br/>
          <p>Selected: {this.state.rSelected}</p>
        
        </div>
    );
  }
}

export default Game;
