import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { connect } from 'react-redux';
import { logout } from '../../../Actions/actions';
import PropTypes from 'prop-types';

const NavBar = (props) => {
  if (!props.user.name) {
    return (
      <div className='header-container'>
        <header>
          <NavLink exact to='/' className='nav' activeClassName='selected'>Home</NavLink>      
          <NavLink to='/login' className='nav' activeClassName='selected'>Log In</NavLink>
          <NavLink to='/signup' className='nav' activeClassName='selected'>Sign Up</NavLink>  
        </header>
        <h1>Movie Tracker</h1> 
      </div>                      
    )   
  } else {
    return (
      <div className='header-container'>
        <header>
          <NavLink exact to='/' className='nav' activeClassName='selected'>Home</NavLink>
          <NavLink to='/favorites' className='nav' activeClassName='selected'>Favorites</NavLink>         
          <button className='nav' onClick={props.logout}>Sign Out</button>
        </header>
        <h1>Welcome {props.user.name}</h1>         
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
})

NavBar.propTypes = {
  user: PropTypes.obj,
  logout: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);