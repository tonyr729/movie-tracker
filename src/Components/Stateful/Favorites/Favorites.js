import React, {Component} from 'react';
import './Favorites.css';
import { connect } from 'react-redux';
import { deleteFavorite } from '../../../Helpers/apiCalls';
import { removeFavorite } from '../../../Actions/actions';
import PropTypes from 'prop-types';

export class Favorites extends Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.user.name) {
      this.props.history.push('/');
    }
  }

  convertFavorites = () => {
    const foundFavorites = this.props.favorites.map((favorite) => {
      const matchedMovie = this.props.movies.find(movie => movie.movie_id === favorite.favoriteId);
      return matchedMovie;
    });
    return foundFavorites;
  }

  componentWillReceiveProps(){
    this.displayFavorites()
  }


  updateFavoritesOnDelete = (movie) => {
    deleteFavorite(this.props.user.id, movie.movie_id);
    this.props.removeFavorite(movie);
  }

  convertFavorites = () => {
    const foundFavorites = this.props.favorites.map((favorite) => {
      const matchedMovie = this.props.movies.find(movie => movie.movie_id === favorite.favoriteId);
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
          <button onClick={() => this.updateFavoritesOnDelete(movie)}>Remove</button>
        </div>
      );
    });
    return renderedFavorites;
  }

  render () {
    return (
      <div className='movies-container scroll'>
        {this.displayFavorites()}
      </div>
    );
  } 
}

export const mapStateToProps = (state) => {
  return ({
    user: state.user,
    favorites: state.favorites,
    movies: state.movies
  });
};

export const mapDispatchToProps = (dispatch) => ({
  removeFavorite: (movie) => dispatch(removeFavorite(movie))
});

Favorites.propTypes = {
  user: PropTypes.obj,
  favorites: PropTypes.array,
  movies: PropTypes.array,
  removeFavorite: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);