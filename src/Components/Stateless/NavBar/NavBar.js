import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <header>
      <NavLink exact to='/' className='nav' activeClassName='selected'>Home</NavLink>
      <NavLink exact to='/login' className='nav' activeClassName='selected'>Log In</NavLink>
      <NavLink exact to='/signup' className='nav' activeClassName='selected'>Sign Up</NavLink>       
      <NavLink exact to='/favorites' className='nav' activeClassName='selected'>Favorites</NavLink>         
    </header>
  )
}

export default NavBar;