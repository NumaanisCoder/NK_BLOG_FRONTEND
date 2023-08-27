import React from 'react'
import { Link } from 'react-router-dom';
import './UI.css';
const Ul = () => {
  return (
    <div className='navlinks'>
       <nav>
      <ul>
            <li><Link className='li' to='/'>Home</Link></li>      
            <li><Link className='li' to='/prof'>Account</Link></li>    
        </ul>
      </nav>
    </div>
  )
}

export default Ul
