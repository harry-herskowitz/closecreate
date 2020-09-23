import React from 'react'
import PropTypes from 'prop-types'

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
          src={`/api/get_file/${picture}`}
          alt="avatar"
        ></img>
      )}
      <div className="row justify-content-center">
        <h1 className="card-title">
          {name.toUpperCase()},{' '}
          {location && <span>{location.toUpperCase()}</span>}
        </h1>
      </div>
      <div className="row justify-content-center">
        {social && social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x" />
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x" />
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x" />
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x" />
          </a>
        )}
        {social && social.instagram && (
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
