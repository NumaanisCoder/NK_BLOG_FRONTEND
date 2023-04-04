import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export const Navbar = () => {
  return (
    <>
    <nav>
      <h1 className='logo'>NK BLOGS</h1>
        <ul>
            <li><Link className='li' to='/'>Home</Link></li>      
            <li><Link className='li' to='/prof'>Account</Link></li>    
        </ul>
    </nav>
    </>
  )
}
