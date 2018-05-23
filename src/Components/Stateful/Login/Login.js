import React, { Component } from 'react';
import './Login.css';
import { signIn, retrieveFavorites} from './../../../Helpers/apiCalls';
import { login, addFavorites } from '../../../Actions/actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      status: ''
    };
  }

  handleSubmit = async (event) => {
    const email = this.state.email.toLowerCase();
    event.preventDefault();
    const user = await signIn(email, this.state.password);
    this.props.login(user.data);
    this.setState({
      email: '',
      password: '',
      status: this.loginAuthorization()
    });
  }
  
  loginAuthorization = () => {
    if (this.props.user.name) {
      this.addFavorites();
      return <Redirect to='/'/>;
    } else {
      return (
        <h2 className='loginh2'> {this.props.user} </h2>
      );
    }
  }

  addFavorites = async () => {
    const userFavorites = await retrieveFavorites(this.props.user.id);
    this.props.addFavorites(userFavorites);
  }

  handleSignin = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    
    return (
      <div className='login-container'>
        <h2> Login to start favoriting movies! </h2>
        <form onSubmit={this.handleSubmit}
          className='login'>
          <label className='email-label'>Email
            <input type="text" 
              placeholder='*JohnDoe@gmail.com*'
              onChange={this.handleSignin}
              value={this.state.email}
              name="email"
              className='login-input email-input'/>
          </label>
          <label className='password-label'>Password 
            <input type="password" 
              onChange={this.handleSignin}
              value={this.state.password}
              name="password"
              className='login-input'/>
          </label>
          <button className='login-button'>Login</button>
        </form>
        { this.state.status }
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  user: state.user
}); 

export const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
  addFavorites: (movies) => dispatch(addFavorites(movies))
});

Login.propTypes = {
  user: PropTypes.obj,
  login: PropTypes.func,
  addFavorites: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);