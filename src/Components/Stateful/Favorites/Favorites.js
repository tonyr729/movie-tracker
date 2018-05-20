import React, {Component} from 'react';
import './Favorites.css';
import { connect } from 'react-redux';
import { retrieveFavorites } from './../../../Helpers/apiCalls';
import { Redirect } from 'react-router-dom';

class Favorites extends Component{
  constructor(props) {
    super(props)
    this.state = {
      favorites: []
    }
  }

  componentDidMount = async () => {
    const {user} = this.props;
    if (user.id) {
      const userFavorites = await retrieveFavorites(user.id)
      const display = await this.displayFavorites(userFavorites)
    } else {
      return <Redirect to='/login'/>;
    }
  }

displayFavorites = (favorites) => {
  const favoritesDisplay = favorites.data.map((movie, index) => {
    return (
      <div className='movie-card' key={index} >
        <p>{movie.title}</p>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
      </div>
    );
  });
  this.setState({favorites:favoritesDisplay})
}

render () {
  return (
    <div className='movies-container scroll'>
      {this.state.favorites}
    </div>
  );
} 
};

const mapStateToProps = (state) => {
  return ({
    user: state.user
  });
};

export default connect(mapStateToProps)(Favorites);