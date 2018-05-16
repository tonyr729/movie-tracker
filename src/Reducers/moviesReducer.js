
const initialState = [];

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MOVIES':
      return [...state, ...action.movieData];
    default:
      return state;
  }
};