import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addMatch } from '../../actions/profile'

var S3_BUCKET = process.env.REACT_APP_S3_BUCKET
var S3_REGION = process.env.REACT_APP_S3_REGION

const ProfileItem = ({
  profile: {
    user: { _id, name },
    picture,
    location
  }
}) => {
  const dispatch = useDispatch()
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
          <button
            onClick={() => dispatch(addMatch(_id))}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-handshake"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem
