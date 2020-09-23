import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { setAlert } from '../../actions/alert'
import { geolocate, register } from '../../actions/auth'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const dispatch = useDispatch()

  const { name, email, password, password2 } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (password !== password2) {
      dispatch(setAlert('Passwords do not match', 'danger'))
    } else {
      dispatch(register({ name, email, password })).then(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          dispatch(
            geolocate(position.coords.latitude, position.coords.longitude)
          )
        })
      })
    }
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="card">
      <h1 className="card-title">Sign Up</h1>
      <form className="w-400 mw-full" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
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
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  )
}

export default Register
