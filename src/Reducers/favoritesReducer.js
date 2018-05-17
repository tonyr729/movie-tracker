const initialState = [];

export const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      console.log([...state, action.movie])
      return [...state, action.movie];
    // case 'REMOVE_FAVORITE':
    //   const newState = state.filter(movie => movie !== action.movie)
    //   return newState
    default: 
      return state;
  }
};