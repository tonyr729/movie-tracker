import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import React from 'react';
import { Login, mapStateToProps, mapDispatchToProps } from './Login';
import { signIn } from '../../../Helpers/apiCalls';
import { Redirect } from 'react-router-dom';

describe('login', () => {

  let login;
  let mockProps;
  let event;

  beforeEach(() => {

    mockProps = {
      user: {name: 'Jack'},
      login: jest.fn(),
      addFavorites: jest.fn()
    }

    login = shallow(<Login {...mockProps} />)

  })

  describe('Component', () => {

    it('matches snapshot', () => {

      login = shallow(<Login {...mockProps} />, { disableLifecycleMethods: true });
      expect(login).toMatchSnapshot();

    })
  })

  describe('handleSubmit', () => {

    let event;
    window.fetch = jest.fn()

    beforeEach(() => {

      event = { preventDefault: () => {} };
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve({data: {}})
      }));
    })

    it('calls props.login', async () => {

      await login.instance().handleSubmit(event);
      
      expect(mockProps.login).toHaveBeenCalled();
    })

    it('resets the state', async () => {
      
      login.state({
        email: 'sospinar@gmail.com',
        password: 'hello'
      }) 

      await login.instance().handleSubmit(event);
      
      expect(login.state().email).toEqual('');
      expect(login.state().password).toEqual('');      

    })
  })

  describe('loginAuthorization', () => {

    it('displays a message if the user is not logged in', () => {

      mockProps.user = {name: ''}
      
      const authorization = login.instance().loginAuthorization();

      expect(authorization).toEqual(<Redirect push={false} to="/" />);
    })

    it('displays a succesfull message if the user is logged in', () => {

      const mockProps = { 
        user: {name: ''},
        login: jest.fn(),
        addFavorites: jest.fn()
      }

      const expected = {'name': ''}
      login = shallow(<Login {...mockProps} />)

      const authorization = login.instance().loginAuthorization();

      expect(authorization).toEqual(<h2 className="loginh2"> {expected} </h2>);
    })

  })

  describe('addFavorites', () => {
    
    it('calls addFavorites', async () => {

      await login.instance().addFavorites();

      expect(mockProps.addFavorites).toHaveBeenCalled();

    })
  })

  describe('mapStateToProps', () => {
    it('returns an object with the users info', () => {

      const mockState = {
        user: {name: 'Steph'}
      }

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(mockState);
      
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch with the correct params', () => {

      const mockDispatch = jest.fn();
      const user = {name: 'jack'}
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'LOGIN',
        user
      };
      
      mappedProps.login(user);
      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
      
    })
  })
})