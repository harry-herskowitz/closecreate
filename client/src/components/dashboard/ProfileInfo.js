import React from 'react'
import PropTypes from 'prop-types'
import { S3_BUCKET, S3_REGION } from '../../utils/s3_config'

const ProfileInfo = ({ profile: { bio, location, social, picture }, user }) => {
  return (
    <>
      {picture && (
        <div className="d-flex justify-content-center">
          <img
            className="rounded"
            src={`https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${picture}`}
            alt="avatar"
          ></img>
        </div>
      )}
      <div className="row justify-content-center">
        <h1 className="card-title">
          {user.name.toUpperCase()},{' '}
          {location && <span>{location.toUpperCase()}</span>}
        </h1>
      </div>
      <div className="row justify-content-around social">
        {social.instagram !== 'https://instagram.com/' && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
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
          <a href={social.soundcloud} target="_blank" rel="noopener noreferrer">
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
    </>
  )
}

ProfileInfo.propTypes = {
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default ProfileInfo
