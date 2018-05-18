import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { connect } from 'react-redux';

const NavBar = (props) => {
  console.log(props.user)
  if (!props.user.name) {
    return (
      <header>
        <NavLink exact to='/' className='nav' activeClassName='selected'>Home</NavLink>      
        <NavLink exact to='/login' className='nav' activeClassName='selected'>Log In</NavLink>
        <NavLink exact to='/signup' className='nav' activeClassName='selected'>Sign Up</NavLink>  
        <NavLink exact to='/favorites' className='nav' activeClassName='selected'>Favorites</NavLink>
      </header>                       
    )   
  } else {
    return (
      <header>
        <NavLink exact to='/' className='nav' activeClassName='selected'>Home</NavLink>
        <button className='nav'>Sign Out</button>
        <NavLink exact to='/favorites' className='nav' activeClassName='selected'>Favorites</NavLink>         
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(NavBar);