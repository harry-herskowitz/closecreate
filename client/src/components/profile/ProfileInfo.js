import React from 'react'
import PropTypes from 'prop-types'
import { S3_BUCKET, S3_REGION } from '../../utils/s3_config'

const ProfileInfo = ({
  profile: {
    bio,
    location,
    social,
    picture,
    user: { name }
  }
}) => {
  return (
    <>
      {picture && (
        <img
          className="rounded"
          src={`https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${picture}`}
          alt="avatar"
        ></img>
      )}
      <div className="row justify-content-center">
        <h1 className="card-title">
          {name.toUpperCase()},{' '}
          {location && <span>{location.toUpperCase()}</span>}
        </h1>
      </div>
      <div className="row justify-content-around social">
        {social.twitter !== 'https://twitter.com/' && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x" />
          </a>
        )}
        {social.facebook !== 'https://facebook.com/' && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x" />
          </a>
        )}
        {social.linkedin !== 'https://linkedin.com/in/' && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x" />
          </a>
        )}
        {social.youtube !== 'https://youtube.com/channel/' && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x" />
          </a>
        )}
        {social.instagram !== 'https://instagram.com/' && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x" />
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
  profile: PropTypes.object.isRequired
}

export default ProfileInfo
