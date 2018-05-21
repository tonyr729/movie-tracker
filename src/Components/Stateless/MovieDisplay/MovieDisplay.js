import React, { Component } from 'react';
import {fetchMovieData, postMovieToFavorites, retrieveFavorites} from './../../../Helpers/apiCalls';
import './MovieDisplay.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMovies, addFavorites } from './../../../Actions/actions';

class MovieDisplay extends Component {
  constructor() {
    super();
  }

  async componentDidMount () {
    const movieData = await fetchMovieData(this.props.user);
    this.props.addMovies(movieData);
  }

  async updateFavorites (movie) {
    const userFavorites = await retrieveFavorites(this.props.user.id);
    this.props.addFavorites(userFavorites);
    postMovieToFavorites(movie, this.props.favorites);
  }
  
  render () {

    const movieDisplay = this.props.movies.map((movie, index) => {
      let newMovie = {...movie};
      
      return (
        <div key={index} className='movie-card' >
          <p>{movie.title}</p>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
          <button onClick={() => this.updateFavorites(movie)}>Favorite</button>
        </div>
      );
    });

    return (
      <div>
        <div className='arrows'>
          <div className='left-arrow'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <path d='M0 0h24v24H0z' fill='none'/>
              <path d='M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'/>
            </svg> 
          </div>      
          <div className='right-arrow' >
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <path d='M0 0h24v24H0z' fill='none'/>
              <path d='M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'/>
            </svg>
          </div>
        </div>
        <div className='movies-container scroll'>
          { movieDisplay }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    movies: state.movies,
    favorites: state.favorites,
    user: state.user
  });
};

const mapDispatchToProps = dispatch => ({
  addMovies: (movieData) => dispatch(addMovies(movieData)),
  addFavorites: (movie) => dispatch(addFavorites(movie))
});

MovieDisplay.propTypes = {
  movies: PropTypes.array,
  addMovies: PropTypes.func,
  addFavorites: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDisplay);