import React from 'react';
import './Favorites.css';
import { connect } from 'react-redux';
import { retrieveFavorites } from './../../../Helpers/apiCalls'

const Favorites = ({user, favorites}) => {
  const favMovies = retrieveFavorites(user.id);
  const favoritesDisplay = favorites.map((movie, index) => {
    return (
      <div key={index} >
        <p>{movie.title}</p>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
      </div>
    );
  });
  return (
    <div>
      {favoritesDisplay}
    </div>
  );
};

const mapStateToProps = (state) => {
  return ({
    favorites: state.favorites,
    user: state.user
  });
};

export default connect(mapStateToProps)(Favorites);