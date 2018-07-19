import React, { Component } from 'react';
import axios from "axios";
import api from '../api';
import ReactAudioPlayer from 'react-audio-player';
import {Button, ButtonGroup} from 'reactstrap';
import pic3 from '../pic3.jpg';
import bg2 from '../bg2.jpg';
import { Progress } from 'reactstrap';
import { Route, Link, Switch } from 'react-router-dom';

class Game extends Component {
  constructor(props){
    super(props)
    this.state = {
      game: null,
      index: null,
      isShowQuestion: true,
      questionIndex: 0,
      score: 0,
      beginnigTime: Date.now()
    };
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }
  

  onRadioBtnClick(iBtn) {
    

    let currentTime = Date.now()
    let nbOfSeconds = Math.round((currentTime - this.state.beginnigTime) / 1000 ) 

    let newScore = this.state.score
    if (this.state.game.questions[this.state.questionIndex].answers[iBtn].isCorrect)
      newScore += 100 - Math.min(nbOfSeconds, 30)
    this.setState({
      isShowQuestion: false,
      score: newScore,
      });
    
    this.setState({iBtn});
  }

  loadNextQuestion() {
    setTimeout(()=>{
      if (this.state.questionIndex+1 === 10) {
        api.saveGameScore(this.props.match.params.gameId, this.state.score)
      }
      this.setState({
        questionIndex: this.state.questionIndex+1,
        iBtn: 4,
        isShowQuestion: true,
        beginnigTime: Date.now()
      });
    },1000)
  }

  componentDidMount() {
    api.getGame(this.props.match.params.gameId)
    .then(game => {
      console.log("this is COMPONENTDIDMOUNT")
      console.log("Should be a track", game)
      this.setState({
        game,
      })
    })
    .catch(err => console.log(err))
  }

  getColor(i) {
    if (this.state.isShowQuestion)
      return "primary"
    if (this.state.game.questions[this.state.questionIndex].answers[i].isCorrect)
      return "success"
      if (!this.state.game.questions[this.state.questionIndex].answers[i].isCorrect && this.state.iBtn===i)
    return "danger"
  }


  render() {
    if (!this.state.game)
      return "Loading..."

    let bestScore = this.state.game.players.reduce((max, val) => Math.max(max, val.score), 0)
    console.log("GAME", this.state.game);
    console.log("bestScore", bestScore);
    
    
    if (this.state.questionIndex >= this.state.game.questions.length) {

      return (
        <div className = "container">
          
          <h3>Your Score is: {this.state.score}</h3>
          <h3>Previous best score : {bestScore}</h3>
          <h3>
          <font face="georgia" size="5"color="secondary"> Share this same game with your friends: </font> </h3>
          <font face="georgia" size="2"color="secondary"> {window.location.href} </font><br/>

          
          <img src={bg2} className="d-block w-100" alt="pic" />
        </div>
      )
    }
    
    let answer=this.state.game.questions && this.state.game.questions[this.state.questionIndex].answers[0].answer
    let answer2=this.state.game.questions && this.state.game.questions[this.state.questionIndex].answers[1].answer
    let answer3=this.state.game.questions && this.state.game.questions[this.state.questionIndex].answers[2].answer
    let answer4=this.state.game.questions && this.state.game.questions[this.state.questionIndex].answers[3].answer
    let url=this.state.game.questions && this.state.game.questions[this.state.questionIndex].previewUrl

    console.log("TEST", this.state.questions && this.state.questions[this.state.questionIndex]);

    

    return (
      <div>
      <div className="container mt-4" >
             <Progress value={this.state.questionIndex} max="10" />
      </div>
        <h3><font face="courier"size="5"color="success">Score : {this.state.score}</font></h3>

        <ReactAudioPlayer autoPlay={true} src={url} controls/> <br/><br/>
        <Button color={this.getColor(0)} onClick={() => this.onRadioBtnClick(0)}  >
          {answer}</Button><br/><br/>
        <Button color={this.getColor(1)} onClick={() => this.onRadioBtnClick(1)} >
          {answer2}</Button><br/><br/>
        <Button color={this.getColor(2)} onClick={() => this.onRadioBtnClick(2)} >
          {answer3}</Button><br/><br/>
        <Button color={this.getColor(3)} onClick={() => this.onRadioBtnClick(3)}  >
          {answer4}</Button>
          <br/><br/>
         <img src={pic3} className="pic" alt="pic" />
        {this.state.iBtn<4 && this.loadNextQuestion.call(this)}
                

        </div>
    );
  }
}

export default Game;
