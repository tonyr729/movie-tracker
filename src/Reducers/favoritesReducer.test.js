import { favoritesReducer } from './favoritesReducer';

describe('favorites reducer', () => {
  it('returns default state if the action type doesn\'t match', () => {
    let initialState = [];
    
    expect(favoritesReducer(undefined, {})).toEqual(initialState);
  });

  it('returns state with new favorites when called', () => {
    let initialState = [];
    let favoriteData = {favoriteId: 4};
    let addfavoriteAction = {
      type: 'ADD_FAVORITE',
      movies: favoriteData
    };

    let newState = favoritesReducer(initialState, addfavoriteAction);

    expect(newState).toEqual(favoriteData);
  });

  it('returns an updated state when removing a movie from favorites', () => {
    let currentState = [{favoriteId: 3}, {favoriteId: 4}];
    let favoriteData = {movie_id: 3};
    let removeFavoriteAction = {
      type: 'REMOVE_FAVORITE',
      movie: favoriteData
    };
    let expected = [{favoriteId: 4}];

    let newState = favoritesReducer(currentState, removeFavoriteAction);

    expect(newState).toEqual(expected);
  });
});