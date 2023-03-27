import React from 'react'
import { Link } from 'react-router-dom'
export const Home = () => {
  return (
    <div><ul>
        <li><Link to='/signup'>Signup</Link>
        </li>
        <li><Link to='/login'>Login</Link></li>
       
    </ul></div>
  )
}
