import React, { Component } from "react";
import backGround from "../bg3.jpg";
import { Button, ButtonGroup } from "reactstrap";
import { Route, Link, Switch } from "react-router-dom";
import api from "../api";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleClickRandom() {
        api.createGame().then(game => {
            this.props.history.push("/games/" + game._id);
        });
    }
    render() {
        return (
            <div id="landing-page">
                <ButtonGroup className="centered-btn">
                    <Button
                        onClick={this.handleClickRandom.bind(this)}
                        color="warning"
                        size="lg"
                    >
                        Play now
                        <i className="fas fa-gamepad" />
                    </Button>{" "}
                    <br />
                    <br />
                    {/* <Button tag={Link} to ="/games"   color="secondary" size="lg">Challenge Game</Button> <br/><br/>
      <Button tag={Link} to ="/games"   color="secondary" size="lg">Custom Game</Button> <br/><br/> */}
                    {/* <Button tag={Link} to ="/games"   color="secondary" size="lg">Leaderboard</Button> <br/><br/> */}
                </ButtonGroup>

                {/* <div className="Home">
          <h2><font face="georgia">Melomaniac</font></h2>
          
       </div> */}
                {/* <img className="d-block w-100" src={backGround} /> */}
            </div>
        );
    }
}

export default Home;
