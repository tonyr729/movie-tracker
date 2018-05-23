import React, { Component } from 'react';
import {signUp} from './../../../Helpers/apiCalls'; 
import './Signup.css';

export class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      status: ''
    };
  }

  handleSignup = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = async (event) => {
    const email = this.state.email.toLowerCase();
    event.preventDefault();
    const message = await signUp(this.state.name, this.state.email, this.state.password);
    this.signUpAuthorization(message);
  }

  signUpAuthorization = (message) => {
    if (!message.status) {
      this.setState({
        name:'',
        email: '',
        password: '',
        status: message.data
      });
    } else {
      this.setState({
        name:'',
        email: '',
        password: '',
        status: 'Account created, please log in'
      });
    }
  }


  render() {
    return (
      <div className='signup-container'>
        <h2>Sign Up Here!</h2>
        <form onSubmit={this.handleSubmit}
          className='signup'>
          <label>Name
            <input className='signup-input name'type="text" name='name' value={this.state.name} onChange={this.handleSignup}/>
          </label>
          <label>Email
            <input className='signup-input email'type="email" name='email' value={this.state.email} onChange={this.handleSignup}/>
          </label>
          <label>Password
            <input className='signup-input' type="password" name='password' value={this.state.password} onChange={this.handleSignup}/>
          </label>
          <button className='signup-button'>Sign Up</button>
        </form>
        <h2>{this.state.status}</h2>
      </div>
    );
  }
}

export default Signup;