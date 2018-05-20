import React, { Component } from 'react';
import './Login.css';
import { signIn } from './../../../Helpers/apiCalls';
import { login } from '../../../Actions/actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Login extends Component {
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
      return <Redirect to='/'/>
    } else {
      return (
        <h2> {this.props.user} </h2>
      )
    }
  }

  handleSignin = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    })
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
            <input type="text" 
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

const mapStateToProps = (state) => ({
  user: state.user
}) 

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);