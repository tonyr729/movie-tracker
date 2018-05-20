import { apikey } from '../apikey';
import DataCleaner from './DataCleaner'

export const fetchMovieData = async (user) => {
  try {
    const dataCleaner = new DataCleaner();
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=1`
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
    const url = 'http://localhost:3000/api/users';
    const login = {email, password}
    const stringifiedBody = JSON.stringify(login)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: stringifiedBody
    })
    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      const data = await {data: 'Invalid Username or Password'}
      return data;
    }
  } catch (error) {
    throw new Error(error);
  }
}

export const signUp = async (name, email, password) => {
  const url = 'http://localhost:3000/api/users/new';
  const body = {name, email, password};
  const stringifiedBody = JSON.stringify(body);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: stringifiedBody
  })
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    const data = await {data: 'Email is already taken'};
    return data;
  }
}

export const postMovieToFavorites = async (movie) => {
  console.log(movie)
  const url = 'http://localhost:3000/api/users/favorites/new';
  const newMovie = JSON.stringify(movie);
  const response  = await fetch(url, {
    method: 'POST', 
    body: newMovie,
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  if (response.ok) {
    const status = await response.json();
    return status;
  } else {
    const status = response.statusText
    return status;
  }
}

export const retrieveFavorites = async (userId) => {
  const url = `http://localhost:3000/api/users/${userId}/favorites`
  const response = await fetch(url);
  if (response.ok){
    const favorites = await response.json()
    return favorites;
  }
}