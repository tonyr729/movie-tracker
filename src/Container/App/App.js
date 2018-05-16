import React, { Component } from 'react';
import './App.css';
import MovieDisplay from './../../Components/Stateless/MovieDisplay/MovieDisplay';



class App extends Component {

  

  render () {
    return (
      <div>
        <MovieDisplay />
      </div>
    );
  }
}

export default App