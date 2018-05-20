import React, { Component } from 'react';
import './App.css';
import MovieDisplay from './../../Components/Stateless/MovieDisplay/MovieDisplay';
import Login from './../../Components/Stateful/Login/Login';
import Favorites from './../../Components/Stateful/Favorites/Favorites';
import { Route } from 'react-router-dom';
import Signup from '../../Components/Stateful/Signup/Signup';
import NavBar from '../../Components/Stateless/NavBar/NavBar';

class App extends Component {

  render () {
    return (
      <div>
        <NavBar />
        <Route exact path='/' component={MovieDisplay} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />        
        <Route exact path='/favorites' component={Favorites} />
      </div>
    );
  }
}

export default App;