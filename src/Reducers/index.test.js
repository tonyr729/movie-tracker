import { rootReducer } from './index'
import { createStore } from 'redux';
import { moviesReducer } from './moviesReducer';
import { favoritesReducer } from './favoritesReducer';
import { userReducer } from './userReducer';

describe('Combine Reducers', () => {
  it('returns rootReducer when called', () => {
    let store = createStore(rootReducer)

    expect(store.getState().movies).toEqual(moviesReducer(undefined, {}))
    expect(store.getState().favorites).toEqual(favoritesReducer(undefined, {}))
    expect(store.getState().user).toEqual(userReducer(undefined, {}))
  });
})