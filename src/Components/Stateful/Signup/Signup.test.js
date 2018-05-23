import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import React from 'react';
import { Signup, mapStateToProps, mapDispatchToProps } from './Signup';
import { Redirect } from 'react-router-dom';
jest.mock('../../../Helpers/apiCalls', () => {
  return jest.fn().mockImplementation(() => {
    return {
      signUp: jest.fn().mockImplementation(() => Promise.resolve([{data1: "data"}, {data2: "data2"}]))
    };
  });
});


describe('Signup', () => {

  let userSignUp;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      user: {name: 'Jack'}
    }
    userSignUp = shallow(<Signup {...mockProps} />)
  })
  

  describe('Component', () => {
    it('matches snapshot', () => {

      expect(userSignUp).toMatchSnapshot();
    })
  });

  describe('handleSignup', () => {

    let event;

    beforeEach(() => {
      event = {
        target: {
          name: "user",
          value: "Tony"
        },
        preventDefault: () => {}
      };
    });

    it('should set state based of the params when called', async () => {

      await userSignUp.instance().handleSignup(event);
      
      expect(userSignUp.state('user')).toEqual('Tony');
    });
  });

  describe('handleSubmit', () => {

    let event;

    beforeEach(() => {
    
      
    });

    it.skip('should call signUp method', async () => {

      await userSignUp.instance().handleSignup(event);
      
      expect(userSignUp.state('user')).toEqual('Tony');
    });
    it.skip('should call signUpAuthorization method', async () => {

      await userSignUp.instance().handleSignup(event);
      
      expect(userSignUp.state('user')).toEqual('Tony');
    });
  });

  describe('signUpAuthorization', () => {

    let event;

    beforeEach(() => {
    
      
    });

    it('should set state to expected value if param matches value', async () => {
      const message = {
        data: "yay",
        status: "successful"
      }

      const expected = {
        name:'',
        email: '',
        password: '',
        status: "Account created, please log in"
      }

      userSignUp.instance().signUpAuthorization(message);

      expect(userSignUp.state()).toEqual(expected);
    });

    it('should set state to expected value if param doesnt match value', async () => {
      const message = {
        data: "failed",
      }

      const expected = {
        name:'',
        email: '',
        password: '',
        status: "failed"
      }

      userSignUp.instance().signUpAuthorization(message)

      expect(userSignUp.state()).toEqual(expected)
    })
  });


});
