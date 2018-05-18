const initialState = {data: null};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.user;
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};