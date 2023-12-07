import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import style from './UI.module.css';
const Ul = () => {
  return (
    <div className={style.navlinks}>
       <nav>
      <ul className={style.NavUL}>
            <li className={style.Navli}><NavLink className={style.li} to='/' style={{color: 'white', textDecoration: "none"}} activeClassName={style.selected}>Home</NavLink></li>      
            <li className={style.Navli}><NavLink className={style.li} to='/prof' style={{color: 'white', textDecoration: "none"}} activeClassName={style.selected}>Account</NavLink></li>    
        </ul>
      </nav>
    </div>
  )
}

export default Ul
