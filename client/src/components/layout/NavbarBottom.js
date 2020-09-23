import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../actions/auth'

const NavbarBottom = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth)
  const { profile } = useSelector((state) => state.profile)

  const dispatch = useDispatch()

  const authLinks = (
    <ul className="navbar-nav d-md-flex justify-content-around">
      <li className="nav-item">
        <Link className="nav-link" to="/profiles">
          <i className="fas fa-search" />
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/matches">
          <i className="fas fa-comment-alt" />
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
          <i className="fas fa-user" />
        </Link>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={() => dispatch(logout)} href="#!">
          {' '}
          <i className="fas fa-sign-out-alt" />
        </a>
      </li>
    </ul>
  )

  return (
    <nav className="navbar navbar-fixed-bottom">
      {!loading && profile && <>{isAuthenticated && authLinks}</>}
    </nav>
  )
}

export default NavbarBottom
