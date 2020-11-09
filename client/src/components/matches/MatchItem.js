import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { S3_BUCKET, S3_REGION } from '../../utils/s3_config'

const MatchItem = ({
  profile: {
    user: { _id, name },
    picture,
    location,
    bio,
    social
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
        <div className="row justify-content-center social">
          {social.instagram !== 'https://instagram.com/' && (
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram fa-2x" />
            </a>
          )}
          {social.youtube !== 'https://youtube.com/channel/' && (
            <a href={social.youtube} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube fa-2x" />
            </a>
          )}
          {social.spotify !== 'https://open.spotify.com/artist/' && (
            <a href={social.spotify} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-spotify fa-2x"></i>
            </a>
          )}
          {social.bandcamp !== 'https://bandcamp.com/' && (
            <a href={social.bandcamp} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-bandcamp fa-2x"></i>
            </a>
          )}
          {social.soundcloud !== 'https://soundcloud.com/' && (
            <a
              href={social.soundcloud}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-soundcloud fa-2x"></i>
            </a>
          )}
        </div>
        {bio && (
          <>
            <p>{bio}</p>
            <div className="line" />
          </>
        )}
        <div className="row justify-content-center">
          <Link className="btn btn-dark mt-10" to={`/chat/${_id}&${user._id}`}>
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
