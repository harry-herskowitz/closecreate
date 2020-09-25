import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Landing = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <section className="card">
      <h2 className="card-title">Welcome to Closecreate</h2>
      <p>Collaborate with local creators</p>
      <div className="justify-content-center">
        <Link to="/register" className="btn btn-primary">
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
