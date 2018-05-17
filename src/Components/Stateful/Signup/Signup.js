import React, { Component } from 'react';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    return(
      <form action="">
        <input type="text" placeholder='Email'/>
        <input type="text" placeholder='Password'/>
        <input type="text" placeholder='Confirm Password'/>
        <button>Submit</button>
      </form>
    );
  }
}

export default Signup;