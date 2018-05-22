import { userReducer } from './userReducer';

describe('user reducer', () => {
  it('returns default state if the action type doesn\'t match', () => {
    let initialState = {data: null};
    
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it('returns new state when user logs in', () => {
    let initialState = [];
    let userData = {id: 4};
    let addUserAction = {
      type: 'LOGIN',
      user: userData
    };

    let newState = userReducer(initialState, addUserAction);

    expect(newState).toEqual(userData);
  });

  it('returns an updated state when user logs out', () => {
    let state = {id: 4}
    let expected = {data: null}
    let removeUserAction = {
      type: 'LOGOUT'
    };

    let newState = userReducer(state, removeUserAction);

    expect(newState).toEqual(expected);
  });
});