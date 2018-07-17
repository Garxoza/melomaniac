import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import Secret from './Secret';
import Login from './Login';
import Game from './Game';
import Signup from './Signup';
import api from '../api';
// import logo from '../logo.svg';
import './App.css';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
    api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {                
    return (
      <div className="App">
      <Navbar className="navbar navbar-expand-sm" color="primary" dark expand="md">
        <div className="navbar container">
        <NavbarBrand  href="/">Home</NavbarBrand>
        <NavbarBrand  href="/games">Games</NavbarBrand>
        {!api.isLoggedIn() && <NavbarBrand className="ml-auto" href="/signup">Signup</NavbarBrand> }<br/>
        {!api.isLoggedIn() && <NavbarBrand className="ml-auto" href="/login">Login</NavbarBrand> }<br/>
        {api.isLoggedIn() && <NavbarBrand href="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</NavbarBrand> }<br/>
        {/* <NavbarBrand href="/secret">Secret</NavbarBrand> */}
        </div>
        </Navbar>        
           
                  <Switch>
          <Route path="/" exact component={Home} />

          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/secret" component={Secret} />
          <Route path="/games" component={Game} />
          <Route render={() => <h2>404</h2>} />
        </Switch>   
             
      </div>
    );
  }
}

export default App;
