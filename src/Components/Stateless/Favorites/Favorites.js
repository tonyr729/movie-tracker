import React from 'react';
import './Favorites.css';
import { connect } from 'react-redux';

const Favorites = ({ favorites }) => {
  const favoritesDisplay = favorites.map((movie, index) => {
    console.log('fuck my ass')
    return (
      <div key={index} >
        <p>{movie.title}</p>
        <img src={`https://image.tmdb.org/t/p/w500${movie.image}`} alt={movie.title}/>
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
    favorites: state.favorites
  });
};

export default connect(mapStateToProps)(Favorites);