import React from 'react'
import logo from './logo.png'
import { NavLink } from 'react-router-dom'

function Nav() {
  return (
    <div>
        <nav>
            <img src={logo} alt="logo-site" />
            <ul>
                <NavLink to="/">Accueil</NavLink>
            </ul>
            <button>don</button>
        </nav>
    </div>
  )
}

export default Nav