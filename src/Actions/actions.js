export const addMovies = (movieData) => ({
  type: 'ADD_MOVIES',
  movieData
});

export const addFavorites = (movie) => ({
  type: 'ADD_FAVORITE',
  movie
});

export const login = (user) => ({
  type: 'LOGIN',
  user
})

export const logout = () => ({
  type: 'LOGOUT'
})
