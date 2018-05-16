import React, { Component } from 'react';
import './App.css';
import MovieDisplay from './../../Components/Stateless/MovieDisplay/MovieDisplay';
import Login from './../../Components/Stateful/Login/Login';
import Favorites from './../../Components/Stateless/Favorites/Favorites';
import { Route } from 'react-router-dom';

class App extends Component {

  render () {
    return (
      <div>
        <Route exact path='/' component={MovieDisplay} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/favorites' component={Favorites} />
      </div>
    );
  }
}

export default App;