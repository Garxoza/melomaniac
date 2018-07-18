import React, { Component } from 'react';
import backGround from '../bg1.jpg';
import {Button, ButtonGroup} from 'reactstrap';
import { Route, Link, Switch } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {                
    return (
      <div className="container" >
      <ButtonGroup>
      <Button tag={Link} to ="/games"   color="secondary" size="lg">Random Game</Button> <br/><br/>
      <Button tag={Link} to ="/games"   color="secondary" size="lg">Challenge Game</Button> <br/><br/>
      <Button tag={Link} to ="/games"   color="secondary" size="lg">Custom Game</Button> <br/><br/>
      <Button tag={Link} to ="/games"   color="secondary" size="lg">Leaderboard</Button> <br/><br/>

      </ButtonGroup>
     
        <div className="Home">
          <h2>Melomaniac</h2>
          
       </div>
       <img className="d-block w-100" src={backGround} />

      </div>
    );
  }
}

export default Home;
