import React, { Component } from 'react';
import {fetchMovieData} from './../../../Helpers/apiCalls';
import './MovieDisplay.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMovies, addFavorites } from './../../../Actions/actions';


class MovieDisplay extends Component {
  constructor() {
    super();
  }

  async componentDidMount () {
    const movieData = await fetchMovieData();
    this.props.addMovies(movieData);
  }

  render () {

    const movieDisplay = this.props.movies.map((movie, index) => {
      return (
        <div key={index} >
          <p>{movie.title}</p>
          <img src={`https://image.tmdb.org/t/p/w500${movie.image}`} alt={movie.title}/>
          <button onClick={() => this.props.addFavorites(movie)}>Favorite</button>
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
  addMovies: (movieData) => dispatch(addMovies(movieData)),
  addFavorites: (movie) => dispatch(addFavorites(movie))
});

MovieDisplay.propTypes = {
  movies: PropTypes.array,
  addMovies: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDisplay);