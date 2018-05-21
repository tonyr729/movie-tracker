import React, {Component} from 'react';
import './Favorites.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { deleteFavorite } from '../../../Helpers/apiCalls';

export class Favorites extends Component{
  constructor(props) {
    super(props)
  }

convertFavorites = () => {
  const foundFavorites = this.props.favorites.map((favorite) => {
    const matchedMovie = this.props.movies.find(movie => movie.movie_id === favorite.favoriteId)
    return matchedMovie;
  });
  return foundFavorites;
}

displayFavorites = () => {
  const favorites = this.convertFavorites();
  const renderedFavorites = favorites.map((movie, index) => {
    return (
      <div key={index} className='movie-card' >
        <p>{movie.title}</p>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
        <button onClick={() => deleteFavorite(this.props.user.id, movie.movie_id)}>Remove</button>
      </div>
    )
  })
  return renderedFavorites;
}

render () {
  return (
    <div className='movies-container scroll'>
      {this.displayFavorites()}
    </div>
  );
} 
};

export const mapStateToProps = (state) => {
  return ({
    user: state.user,
    favorites: state.favorites,
    movies: state.movies
  });
};

export default connect(mapStateToProps)(Favorites);