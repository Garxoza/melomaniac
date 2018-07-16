import React, { Component } from 'react';
import axios from "axios";
import api from '../api';
import ReactAudioPlayer from 'react-audio-player';

class Game extends Component {
  constructor(props){
    super(props)
    this.state = {
      game: null,
    //   game:  {
    //     questions: [{
    //       musicUrl: {},
       
    //     answers: [{
    //       answer: {},
    //       isCorrect: {}
    //     }]
    //   }],
    //   players: [{
    //     _user: {},
    //     score: {},
    //     guesses: [{}]
    //   }]
    // }
    };
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
    console.log("this is Answer1", this.state.game.questions[0].answers[0].answer)
  
    let answer=this.state.game.questions && this.state.game.questions[0].answers[0].answer
    let answer2=this.state.game.questions && this.state.game.questions[0].answers[1].answer
    let answer3=this.state.game.questions && this.state.game.questions[0].answers[2].answer
    let answer4=this.state.game.questions && this.state.game.questions[0].answers[3].answer
    let url=this.state.game.questions && this.state.game.questions[0].musicUrl
    console.log("MUSICURL", url)
    console.log("ANSWER", answer)
    console.log("TEST", this.state.questions && this.state.questions[0]);
    

    return (
      <div className="Game">
        <h2>Random Game</h2>

        {JSON.stringify(answer)}

        <ReactAudioPlayer src={url} controls/> <br/>
        <button onClick={(e) => this.handleClick(e)}>{answer}</button><br/>
        <button onClick={(e) => this.handleClick(e)}>{answer2}</button><br/>
        <button onClick={(e) => this.handleClick(e)}>{answer3}</button><br/>
        <button onClick={(e) => this.handleClick(e)}>{answer4}</button>
        
        </div>
    );
  }
}

export default Game;
