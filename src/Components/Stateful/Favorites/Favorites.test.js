import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import React from 'react';
import { Favorites, mapStateToProps } from './Favorites';

describe('Favorites', () => {
  
  let favorites;
  let mockProps;

  beforeEach(() => {

    mockProps = {
      user: {},
      favorites: [{favoriteId: 1}],
      movies: [{movie_id: 4, title: 'Spiderman'}, {movie_id: 1, title:'Batman'}]
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