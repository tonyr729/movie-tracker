import React, { Component } from 'react';
import {signUp} from './../../../Helpers/apiCalls'

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: ''
    };
  }

  handleSignup = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async (event) => {
    const email = this.state.email.toLowerCase();
    event.preventDefault();
    const message = await signUp(this.state.name, this.state.email, this.state.password)
    console.log(message)
  }


  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder='Name' name='name' value={this.state.name} onChange={this.handleSignup}/>
        <input type="text" placeholder='Email' name='email' value={this.state.email} onChange={this.handleSignup}/>
        <input type="text" placeholder='Password' name='password' value={this.state.password} onChange={this.handleSignup}/>
        <button>Submit</button>
      </form>
    );
  }
}

export default Signup;