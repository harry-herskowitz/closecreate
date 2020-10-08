import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../img/logo.png'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand m-auto">
        <Link to="/dashboard">
          <img className="logo" src={logo} alt="logo" /> Closecreate
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
