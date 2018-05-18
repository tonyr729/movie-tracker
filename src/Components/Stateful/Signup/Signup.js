import React, { Component } from 'react';
import {signUp} from './../../../Helpers/apiCalls';
// import { connect } from ''

class Signup extends Component {
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder='Name' name='name' value={this.state.name} onChange={this.handleSignup}/>
          <input type="text" placeholder='Email' name='email' value={this.state.email} onChange={this.handleSignup}/>
          <input type="text" placeholder='Password' name='password' value={this.state.password} onChange={this.handleSignup}/>
          <button>Submit</button>
        </form>
        <h2>{this.state.status}</h2>
      </div>
    );
  }
}

export default Signup;