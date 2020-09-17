import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addMatch } from '../../actions/profile'

const ProfileItem = ({
  profile: {
    user: { _id, name },
    picture,
    location,
    skills
  }
}) => {
  const dispatch = useDispatch()
  return (
    <div className="profile bg-light">
      {picture && <img src={`/api/get_file/${picture}`}></img>}
      <div>
        <h2>{name}</h2>
        <p className="my-1">{location && <span>{location}</span>}</p>
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
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check" /> {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem
