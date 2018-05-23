import React, { Component } from 'react';
import {fetchMovieData, postMovieToFavorites, retrieveFavorites, deleteFavorite} from './../../../Helpers/apiCalls';
import './MovieDisplay.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMovies, addFavorites, removeFavorite } from './../../../Actions/actions';
import { NavLink } from 'react-router-dom';

class MovieDisplay extends Component {
  constructor() {
    super();
    this.state = {
      selectedMovie: null
    }
  }

  async componentDidMount () {
    const movieData = await fetchMovieData(this.props.user);
    this.props.addMovies(movieData);
  }

  handleSelectedMovie =(movie) => {
    this.setState({
      selectedMovie: movie
    });
  }

  showSelectedMovie = (movie) => {
    if (this.state.selectedMovie) {
      const favorite = this.props.favorites.find(favorite => favorite.favoriteId === movie.movie_id);
      const favButton = this.props.user.name ? 
        <button className={favorite ? 'fav-button-selected' : 'fav-button'} onClick={() => this.updateFavorites(movie)}>{favorite ? '★' : '☆'}</button>
      : <NavLink className='nav-favorite' to='/signup'><button className={favorite ? 'fav-button-selected' : 'fav-button'}>{favorite ? '★' : '☆'}</button></NavLink>;
      return (
        <div className={'movie-card-selected'} >
          <p className='movie-title-selected'>{this.state.selectedMovie.title}</p>
          <img className='movie-poster-selected' src={`https://image.tmdb.org/t/p/w500${this.state.selectedMovie.poster_path}`} alt={this.state.selectedMovie.title}/>
          <div className='overview'><p>{this.state.selectedMovie.overview}</p></div>
          <div className='rating'>{this.state.selectedMovie.vote_average} / 10</div>
          {favButton}
        </div>
      )
    } else {
      return (
        <div className='pick-movie-text'>
          <p>Select a movie</p>
        </div>
      )
    }
  }

  async updateFavorites (movie) {
    const match = this.props.favorites.find(favorite => movie.movie_id === favorite.favoriteId)
    if (!match) {
      postMovieToFavorites(movie, this.props.favorites);
      const userFavorites = await retrieveFavorites(this.props.user.id);
      const newFavorites = [...userFavorites, {favoriteId: movie.movie_id}]
      this.props.addFavorites(newFavorites);
    } else {
      deleteFavorite(this.props.user.id, movie.movie_id);
      this.props.removeFavorite(movie);
    }
  }
  
  render () {
    const movieDisplay = this.props.movies.map((movie, index) => {
      const favorite = this.props.favorites.find(favorite => favorite.favoriteId === movie.movie_id)      
      const favButton = this.props.user.name ? 
        <button className={favorite ? 'fav-button-selected' : 'fav-button'} onClick={() => this.updateFavorites(movie)}>{favorite ? '★' : '☆'}</button>
      : <NavLink className='nav-favorite' to='/signup'><button className={favorite ? 'fav-button-selected' : 'fav-button'}>{favorite ? '★' : '☆'}</button></NavLink>;

      return (
        <div key={index} className='movie-card'>
          <img onClick={() => this.handleSelectedMovie(movie)} className='movie-poster' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
          {favButton}
        </div>
      );
    });

    return (
      <div>
        <div className='selected-movie'>
          {this.showSelectedMovie(this.state.selectedMovie)}
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