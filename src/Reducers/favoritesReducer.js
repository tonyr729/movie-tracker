import { postMovieToFavorites } from '../Helpers/apiCalls';

const initialState = [];

export const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      const match = state.find(movie => {
        if (action.movie.title) {
          return movie.title === action.movie.title;
        }
      });
      if (!match) {
        postMovieToFavorites(action.movie)
        return [...state, action.movie];
      }
    // case 'REMOVE_FAVORITE':
    //   const newState = state.filter(movie => movie !== action.movie)
    //   return newState
    default: 
      return state;
  }
};