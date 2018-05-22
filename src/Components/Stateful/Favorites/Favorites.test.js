import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import React from 'react';
import { Favorites, mapStateToProps } from './Favorites';
import { removeFavorite } from '../../../Actions/actions';

describe('Favorites', () => {
  
  let favorites;
  let mockProps;

  beforeEach(() => {

    mockProps = {
      user: {},
      favorites: [{favoriteId: 1}],
      movies: [{movie_id: 4, title: 'Spiderman'}, {movie_id: 1, title:'Batman'}],
      removeFavorite: jest.fn()
    };

    favorites = shallow(<Favorites {...mockProps} />, { disableLifecycleMethods: true });
  });
  
  describe('component', () => {
    it('matches snapshot', () => {
      favorites = renderer.create(<Favorites {...mockProps} />, { disableLifecycleMethods: true }).toJSON();
      expect(favorites).toMatchSnapshot();
    });
  });

  describe('displayFavorites', () => {

    it('should only display matched favorites', () => {

      const expected = [{movie_id: 1, title:'Batman'}]

      expect(favorites.instance().convertFavorites()).toEqual(expected)


    });
  });

  describe('updateFavoritesOnDelete', () => {

    it('calls delete favorite with the correct params', async () => {
      
      const expected = 2;
      const movie = {movie_id: 2};
      window.fetch = jest.fn();
      const deleteFav = deleteFavorite;
      const deleteFavorite = jest.fn();
      
      favorites.instance().updateFavoritesOnDelete(movie);

      expect(deleteFavorite).toHaveBeenCalled();
    });
  });

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
});