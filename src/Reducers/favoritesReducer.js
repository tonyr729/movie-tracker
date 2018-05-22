const initialState = [];

export const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return action.movies;
    case 'REMOVE_FAVORITE':
      const newState = state.filter(movie => movie.favoriteId !== action.movie.movie_id);
      return newState;
    default: 
      return state;
  }
};