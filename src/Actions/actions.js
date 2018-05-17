export const addMovies = (movieData) => ({
  type: 'ADD_MOVIES',
  movieData
});

export const addFavorites = (movie) => ({
  type: 'ADD_FAVORITE',
  movie
});
