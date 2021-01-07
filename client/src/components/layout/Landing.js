import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import collab from '../../img/collab.png'

const Landing = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <section className="card">
      <div className="d-flex justify-content-center">
        <h2 className="card-title">Welcome Creators!</h2>
      </div>
      <img className="splash" src={collab} alt="collab" />
      <p>
        Closecreate is a matchmaking app that uses geolocation to help creators
        find eachother and make awesome stuff. Collaborate anywhere in the
        world, or find new creators in your own backyard.
      </p>
      <div className="d-flex justify-content-center">
        <Link to="/register" className="btn btn-primary mr-10">
          Sign Up
        </Link>
        <Link to="/login" className="btn btn-light">
          Login
        </Link>
      </div>
    </section>
  )
}

export default Landing
