import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

var S3_BUCKET = process.env.REACT_APP_S3_BUCKET
var S3_REGION = process.env.REACT_APP_S3_REGION

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
          src={`https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${picture}`}
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
