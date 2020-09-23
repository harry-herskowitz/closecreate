import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { geolocate, login } from '../../actions/auth'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { isAuthenticated } = useSelector((state) => state.auth)

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
    <div className="card">
      <h1 className="card-title">Sign In</h1>
      <form className="w-400 mw-full" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            className="form-control"
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
            className="form-control"
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
    </div>
  )
}

export default Login
