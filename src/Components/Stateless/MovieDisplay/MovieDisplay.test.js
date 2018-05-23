import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import React from 'react';
import { MovieDisplay, mapStateToProps, mapDispatchToProps } from './MovieDisplay';
import  fetchMovieData  from '../../../Helpers/apiCalls';

describe('movieDisplay', () => {
  
  let movieDisplay;
  let mockProps;
  window.fetch = jest.fn();

  beforeEach(() => {

    mockProps = {
      user: {},
      favorites: [{favoriteId: 1}],
      movies: [{movie_id: 4, title: 'Spiderman'}, {movie_id: 1, title:'Batman'}],
      removeFavorite: jest.fn(),
      addMovies: jest.fn(),
    };

    movieDisplay = shallow(<MovieDisplay {...mockProps} />, { disableLifecycleMethods: true });

    window.fetch.mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve({data: {}})
    }));
  });

  describe('component', () => {

    it('matches snapshot', () => {
      expect(movieDisplay).toMatchSnapshot();
    });
  })

  describe('handleSelectedMovie', () => {

    it('sets state with the new selected movie', () => {

      const movie = {movie_id: 1, title:'Batman'}

      movieDisplay.instance().handleSelectedMovie(movie)

      expect(movieDisplay.state('selectedMovie')).toEqual(movie)
      
    });
  })

  describe('updateFavorites', () => {

    it('calls remove favorites with the correct params', () => {

      const movie = {movie_id: 1, title:'Batman'}

      movieDisplay.instance().updateFavorites(movie)

      expect(mockProps.removeFavorite).toHaveBeenCalledWith(movie)

    });
  })

  describe('mapStateToProps', () => {

    it('should return an object with user, favorites and movies', () => {

      const mockState = {
        user: {name: 'Tony'},
        favorites: [],
        movies: []
      };

      const expected = {
        user: {name: 'Tony'},
        favorites: [],
        movies: []
      };

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);

    });
  });

  describe('mapDispatchToProps', () => {

    let mockDispatch;
    let movie;
    let mappedProps

    beforeEach(() => {

      mockDispatch = jest.fn();
      movie = {movie_id: 1, title:'Batman'}
      mappedProps = mapDispatchToProps(mockDispatch);
    })

    it('should call dispatch with the correct params', () => {

      const mockAction = {
        type: 'REMOVE_FAVORITE',
        movie
      };
      
      mappedProps.removeFavorite(movie);
      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    })

    it('should call dispatch with the add movie action', () => {

      const movieData = {movie_id: 1, title:'Batman'}

      const mockAction = {
        type: 'ADD_MOVIES',
        movieData
      };
      
      mappedProps.addMovies(movie);
      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    })

    it('should call dispatch with the add movie action', () => {

      const movies = {movie_id: 1, title:'Batman'}

      const mockAction = {
        type: 'ADD_FAVORITE',
        movies
      };
      
      mappedProps.addFavorites(movie);
      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    })


  })

})