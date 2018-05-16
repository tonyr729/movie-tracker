import React, { Component } from 'react';
import {fetchMovieData} from '../../Helpers/apiCalls.js'
import './App.css';

class App extends Component {
  constructor () { 
    super();
    this.state = {
      movies: []
    }
  }

  async componentDidMount () {
    const movieData = await fetchMovieData()
    const movieDisplay = movieData.map(movie => {
      return (
        <div>
          <p>{movie.title}</p>
          <img src={`https://image.tmdb.org/t/p/w500${movie.image}`} alt=""/>
        </div>

      )
    })
    this.setState({
      movies: movieDisplay
    })
  }

  render () {
    return (
      <div>
        { this.state.movies }
      </div>
    );
  }
}

export default App;
