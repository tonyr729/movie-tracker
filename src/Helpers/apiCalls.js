import { apikey } from '../apikey';
import DataCleaner from './DataCleaner';

export const fetchMovieData = async (user) => {
  try {
    const dataCleaner = new DataCleaner();
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=1`;
    const response = await fetch(url);
    const data = await response.json();
    const cleanData = await dataCleaner.cleanMovies(data.results, user);
    
    return cleanData;
  } catch (error) {
    throw new Error('Failed to fetch');
  }
};

export const signIn = async (email, password) => {
  try {
    const url = '/api/users';
    const login = {email, password};
    const stringifiedBody = JSON.stringify(login);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: stringifiedBody
    });
    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      const data = {data: 'Invalid Username or Password'};
      return data;
    }
  } catch (error) {
    throw error;
  }
};

export const signUp = async (name, email, password) => {
  try {
    const url = '/api/users/new';
    const body = {name, email, password};
    const stringifiedBody = JSON.stringify(body);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: stringifiedBody
    });
    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      const data = {data: 'Email is already taken'};
      return data;
    }
  } catch (error) {
    throw error;
  }
};

export const postMovieToFavorites = async (movie, favorites) => {
  try {
    const url = '/api/users/favorites/new';
    const newMovie = JSON.stringify(movie);
    const match = favorites.find(favorite => favorite.favoriteId === movie.movie_id);
    if (!match) {
      const response  = await fetch(url, {
        method: 'POST', 
        body: newMovie,
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      });
    }
  } catch (error) {
    throw error;
  }
};

export const retrieveFavorites = async (userId) => {
  try {
    const cleaner = new DataCleaner();
    const url = `/api/users/${userId}/favorites`;
    const response = await fetch(url);
    if (response.ok) {
      const favorites = await response.json();
      const favId = await cleaner.cleanFavorites(favorites.data);
      return favId;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteFavorite = async (userId, movieId) => {
  try {
    const url = `/api/users/${userId}/favorites/${movieId}`;
    const response = await fetch(url, {
      method: 'DELETE'
    });
  } catch (error) {
    throw error;
  }
};