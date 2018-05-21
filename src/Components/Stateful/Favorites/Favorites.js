import React, {Component} from 'react';
import './Favorites.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Favorites extends Component{
  constructor(props) {
    super(props)
  }

displayFavorites = (favorites) => {
  const foundFavorites = this.props.favorites.map((favorite) => {
    const matchedMovie = this.props.movies.find(movie => movie.movie_id === favorite.favoriteId)
    return matchedMovie;
  });
  return foundFavorites.map((movie, index) => {
    return(
      <div key={index} className='movie-card' >
        <p>{movie.title}</p>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
        <button>Remove</button>
      </div>
    )
  })
}

render () {
  return (
    <div className='movies-container scroll'>
      {this.displayFavorites()}
    </div>
  );
} 
};

const mapStateToProps = (state) => {
  return ({
    user: state.user,
    favorites: state.favorites,
    movies: state.movies
  });
};

export default connect(mapStateToProps)(Favorites);