import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { connect } from 'react-redux';
import { logout } from '../../../Actions/actions';

const NavBar = (props) => {
  if (!props.user.name) {
    return (
      <div className='header-container'>
        <header>
          <NavLink exact to='/' className='nav' activeClassName='selected'>Home</NavLink>      
          <NavLink exact to='/login' className='nav' activeClassName='selected'>Log In</NavLink>
          <NavLink exact to='/signup' className='nav' activeClassName='selected'>Sign Up</NavLink>  
          <NavLink exact to='/favorites' className='nav' activeClassName='selected'>Favorites</NavLink>
        </header>
        <h1>Movie Tracker</h1> 
      </div>                      
    )   
  } else {
    return (
      <header>
        <NavLink exact to='/' className='nav' activeClassName='selected'>Home</NavLink>
        <NavLink exact to='/favorites' className='nav' activeClassName='selected'>Favorites</NavLink>         
        <button className='nav' onClick={props.logout}>Sign Out</button>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);