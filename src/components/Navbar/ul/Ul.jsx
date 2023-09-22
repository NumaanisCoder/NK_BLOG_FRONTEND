import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import './UI.css';
const Ul = () => {
  return (
    <div className='navlinks'>
       <nav>
      <ul>
            <li><NavLink className='li' to='/' ctiveClassName="active" ><i class="fa-solid fa-house"></i></NavLink></li>      
            <li><NavLink className='li' to='/prof'><i class="fa-solid fa-user"></i></NavLink></li>    
        </ul>
      </nav>
    </div>
  )
}

export default Ul
