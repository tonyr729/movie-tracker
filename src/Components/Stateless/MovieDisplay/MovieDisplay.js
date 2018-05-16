import React, { Component } from 'react';
import {fetchMovieData} from './../../../Helpers/apiCalls';
import './MovieDisplay.css';
import { connect } from 'react-redux';
import { addMovies } from './../../../Actions/actions';

class MovieDisplay extends Component {
  constructor() {
    super();
  }

  async componentDidMount () {
    const movieData = await fetchMovieData();
    this.props.addMovies(movieData)
  }

  render () {

    const movieDisplay = this.props.movies.map((movie, index) => {
      return (
        <div key={index} >
          <p>{movie.title}</p>
          <img src={`https://image.tmdb.org/t/p/w500${movie.image}`} alt={movie.title}/>
        </div>
      );
    });

    return (
      <div>
        { movieDisplay }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    movies: state.movies
  });
};

const mapDispatchToProps = dispatch => ({
  addMovies: (movieData) => dispatch(addMovies(movieData))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDisplay);