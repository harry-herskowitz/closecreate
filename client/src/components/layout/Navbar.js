import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand m-auto">
        <Link to="/dashboard">Closecreate</Link>
      </div>
    </nav>
  )
}

export default Navbar
