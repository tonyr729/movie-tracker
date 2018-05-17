import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <header>
      <NavLink to='/' className='nav'>Home</NavLink>
      <NavLink to='/login' className='nav'>Log In</NavLink>
      <NavLink to='/signup' className='nav'>Sign Up</NavLink>       
      <NavLink to='/favorites' className='nav'>Favorites</NavLink>         
    </header>
  )
}

export default NavBar;