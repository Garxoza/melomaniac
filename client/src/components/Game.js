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
      index: null,
      isShowQuestion: true,
      questionIndex: 0,
      score: 0,
      
    };
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }
  onRadioBtnClick(iBtn) {
    let newScore = this.state.score
    if (this.state.game.questions[this.state.questionIndex].answers[iBtn].isCorrect)
      newScore += 100
    this.setState({
      isShowQuestion: false,
      score: newScore
    });
    
    this.setState({iBtn});
    console.log("Button Index is ", iBtn)
  }

  // handleClickNext() {
  //   this.setState({
  //     questionIndex: this.state.questionIndex+1,
  //     isShowQuestion: true
  //   });
  // }

  loadNextQuestion() {
    setTimeout(()=>{
      this.setState({
        questionIndex: this.state.questionIndex+1,
        iBtn: 4,
        isShowQuestion: true
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

  // getColor(i) {
  //    if (this.state.isShowQuestion)
  //     return "primary"
  //   if (this.state.game.questions[this.state.questionIndex].answers[i].isCorrect)
  //     return "success"
  //   if (!this.state.game.questions[this.state.questionIndex].answers[i].isCorrect && this.state.rSelected===i+1)
  //     return "danger"
  //   return "primary"
  // }

  render() {
    if (!this.state.game)
      return "Loading..."


    
    if (this.state.questionIndex >= this.state.game.questions.length) {
      return (
        <div>
          <h1>It's over</h1>
          <h3>Score : {this.state.score}</h3>
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
          
        
        {/* {!this.state.isShowQuestion && <Button color="primary" onClick={this.handleClickNext.bind(this)}>Next</Button>} */}

        {this.state.iBtn<4 && this.loadNextQuestion.call(this)}
                

        </div>
    );
  }
}

export default Game;
