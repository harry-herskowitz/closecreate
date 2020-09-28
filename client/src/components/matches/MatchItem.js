import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const MatchItem = ({
  profile: {
    user: { _id, name },
    picture,
    location
  }
}) => {
  const { user } = useSelector((state) => state.auth)

  return (
    <div className="card">
      {picture && (
        <img
          className="rounded"
          src={`https://closecreate.s3.us-east-2.amazonaws.com/${picture}`}
          alt="avatar"
        ></img>
      )}
      <div>
        <div className="row justify-content-center">
          <h1 className="card-title">
            {name.toUpperCase()},{' '}
            {location && <span>{location.toUpperCase()}</span>}
          </h1>
        </div>
        <div className="row justify-content-center">
          <Link to={`/profile/${_id}`} className="btn btn-primary">
            View Profile
          </Link>
          <Link className="btn btn-dark" to={`/chat/${_id}&${user._id}`}>
            Chat
          </Link>
        </div>
      </div>
    </div>
  )
}

MatchItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default MatchItem
