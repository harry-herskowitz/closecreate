import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { geolocate, login } from '../../actions/auth'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const dispatch = useDispatch()

  const { email, password } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password)).then(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(geolocate(position.coords.latitude, position.coords.longitude))
      })
    })
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign Into Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </>
  )
}

export default Login
