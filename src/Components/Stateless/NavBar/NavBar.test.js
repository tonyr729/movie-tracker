import React from 'react';
import { NavBar, mapStateToProps, mapDispatchToProps } from './NavBar';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

describe('NavBar', () => {

  let mockProps;
  let navBar;

  beforeEach(() => {

    mockProps = {
      user: {name: 'Steph'},
      logout: jest.fn()
    };

    navBar = shallow(<NavBar {...mockProps} />);
  });

  describe('component', () => {

    it('matches snapshot', () => {
      navBar = shallow(<NavBar {...mockProps} />, { disableLifecycleMethods: true });
      expect(navBar).toMatchSnapshot();
    });

    it('returns a different menu if the user is logged in', () => {

      navBar = shallow(<NavBar {...mockProps} />);

      const userMenu = navBar.find('div');
      expect(userMenu.hasClass('user-logged-in')).toBe(true);

    });

    it('returns a different menu if the user is logged out', () => {

      const mockProps = {user: {name: ''}}
      navBar = shallow(<NavBar  {...mockProps} />);

      const userMenu = navBar.find('div');
      expect(userMenu.hasClass('user-logged-in')).toBe(false);

    });
  });

  describe('mapStateToProps', () => {

    it('returns an object with user', () => {
      
      const mockState = {
        user: {name: 'Tony'}
      };
  
      const mappedProps = mapStateToProps(mockState);
  
      expect(mappedProps).toEqual(mockState);
    });

  });

  describe('mapStateToProps', () => {
    
    it('should call dispatch ', () => {

      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'LOGOUT'
      };

      mappedProps.logout();
      expect(mockDispatch).toHaveBeenCalledWith(mockAction)
    })
  });
  
});