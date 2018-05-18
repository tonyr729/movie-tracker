import React, { Component } from 'react';
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
      status: this.userAuthorization()
    });
  }
  
  userAuthorization = () => {
    if (this.props.user.name) {
      return <Redirect to='/'/>
    } else {
      return (
        <h2>Error</h2>
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
      <div>
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