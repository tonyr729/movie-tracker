import React, { Component } from 'react';
import { signIn } from './../../../Helpers/apiCalls'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = async (event) => {
    const email = this.state.email.toLowerCase();
    event.preventDefault();
    const user = await signIn(email, this.state.password)
    console.log(user)
  }

  handleSignin = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" 
               placeholder='Email'
               onChange={this.handleSignin}
               value={this.state.email}
               name="email"/>
        <input type="text" 
               placeholder='Password'
               onChange={this.handleSignin}
               value={this.state.password}
               name="password"/>
        <button>Submit</button>
      </form>
    );
  }
}

export default Login;