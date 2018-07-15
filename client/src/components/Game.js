import React, { Component } from 'react';
import axios from "axios";
import api from '../api';

class Game extends Component {
  constructor(props){
    super(props)
    this.state = {
      game: {
        // body: {
        //   artists: {
        //     items: [{
        //       name: ""
        //     }]
        //   }
        // }
      }
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
    console.log("this is this.state", this.state)
    console.log("this is RENDER")
    // let name=this.state.game.body.artists.items && this.state.game.body.artists.items[0].name;
    return (
      <div className="Game">
        <h2>Random Game</h2>
        {/* {console.log(this.state.game.body.artists.items)}  */}
        <p>hello {}</p>
        </div>
    );
  }
}

export default Game;
