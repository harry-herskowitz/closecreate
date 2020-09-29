import React from 'react'
import { Link } from 'react-router-dom'

import compass from '../../img/compass.png'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand m-auto">
        <Link to="/dashboard">
          <img className="logo" src={compass} /> Closecreate
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
