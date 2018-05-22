import React, { Component } from 'react';
import {fetchMovieData, postMovieToFavorites, retrieveFavorites, deleteFavorite} from './../../../Helpers/apiCalls';
import './MovieDisplay.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMovies, addFavorites, removeFavorite} from './../../../Actions/actions';

class MovieDisplay extends Component {
  constructor() {
    super();
  }

  async componentDidMount () {
    const movieData = await fetchMovieData(this.props.user);
    this.props.addMovies(movieData);
  }

  async updateFavorites (movie) {
    const match = this.props.favorites.find(favorite => movie.movie_id === favorite.favoriteId)
    if (!match) {
      postMovieToFavorites(movie, this.props.favorites);
      const userFavorites = await retrieveFavorites(this.props.user.id);
      const newFavorites = [...userFavorites, {favoriteId: movie.movie_id}]
      this.props.addFavorites(newFavorites);
      console.log('adding')
    } else {
      deleteFavorite(this.props.user.id, movie.movie_id);
      this.props.removeFavorite(movie);
      console.log('removing')
    }
  }
  
  render () {

    const movieDisplay = this.props.movies.map((movie, index) => {
      const favorite = this.props.favorites.find(favorite => favorite.favoriteId === movie.movie_id)      
      return (

        <div key={index} className={favorite ? 'favorite-card' : 'movie-card'} >
          <p className='movie-title'>{movie.title}</p>
           <img className='movie-poster' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
          <button className='fav-button' onClick={() => this.updateFavorites(movie)}>{favorite ? 'Delete' : 'Favorite'}</button>

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
  addFavorites: (movie) => dispatch(addFavorites(movie)),
  removeFavorite: (movie) => dispatch(removeFavorite(movie))
});

MovieDisplay.propTypes = {
  movies: PropTypes.array.isRequired,
  favorites: PropTypes.array,
  user: PropTypes.obj,
  addMovies: PropTypes.func.isRequired,
  addFavorites: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDisplay);