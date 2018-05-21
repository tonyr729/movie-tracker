export const addMovies = (movieData) => ({
  type: 'ADD_MOVIES',
  movieData
});

export const addFavorites = (movies) => ({
  type: 'ADD_FAVORITE',
  movies
});

export const removeFavorite = (movie) => ({
  type: 'REMOVE_FAVORITE',
  movie
});

export const login = (user) => ({
  type: 'LOGIN',
  user
});

export const logout = () => ({
  type: 'LOGOUT'
});
