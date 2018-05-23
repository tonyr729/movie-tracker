import { moviesReducer } from './moviesReducer';

describe('movies reducer', () => {
  it('returns default state if the action type doesn\'t match', () => {
    let initialState = [];
    
    expect(moviesReducer(undefined, {})).toEqual(initialState);
  });

  it('returns state with a new movie when called', () => {
    let initialState = [];
    let movieData = [{movie: 'test movie'}, {movie: 'anotha one'}];
    let addMovieAction = {
      type: 'ADD_MOVIES',
      movieData 
    };

    let newState = moviesReducer(initialState, addMovieAction);

    expect(newState).toEqual(movieData);
  });

  it('returns an updated state with the new movie when called', () => {
    let currentState = [{movie: 'Avengers'}];
    let movieData = [{movie: 'test movie'}, {movie: 'anotha one'}];
    let addMovieAction = {
      type: 'ADD_MOVIES',
      movieData 
    };
    let expected = [{"movie": "test movie"}, {"movie": "anotha one"}];

    let newState = moviesReducer(currentState, addMovieAction);

    expect(newState).toEqual(expected);
  });
});