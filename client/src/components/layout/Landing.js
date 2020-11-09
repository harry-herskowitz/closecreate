import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Emoji from '../emoji'

const Landing = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <section className="card">
      <h2 className="card-title">
        Welcome Creators! <Emoji symbol="📸" label="camera" />
        <Emoji symbol="🎨" label="paint" />
        <Emoji symbol="🎸" label="guitar" />
      </h2>
      <p>
        Closecreate is a matchmaking app <Emoji symbol="🤝" label="handshake" />{' '}
        that uses geolocation <Emoji symbol="📍" label="pinpoint" /> to help
        creators find eachother <Emoji symbol="👥" label="buddies" /> and make
        awesome stuff <Emoji symbol="💥" label="explosion" />. Collaborate
        anywhere in the world <Emoji symbol="🗺️" label="map" />, or find new
        creators in your own backyard <Emoji symbol="🏡" label="house" />.
      </p>
      <div className="justify-content-center">
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
