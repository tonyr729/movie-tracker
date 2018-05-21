import { postMovieToFavorites } from '../Helpers/apiCalls';

const initialState = [];

export const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
        return action.movies;
    // case 'REMOVE_FAVORITE':
    //   const newState = state.filter(movie => movie !== action.movie)
    //   return newState
    default: 
      return state;
  }
};