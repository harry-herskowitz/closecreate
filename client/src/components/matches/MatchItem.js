import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const MatchItem = ({
  profile: {
    user: { _id, name, avatar },
    location,
    skills
  }
}) => {
  const { user } = useSelector((state) => state.auth)

  return (
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
        <Link to={`/chat/${_id}&${user._id}`}>Chat</Link>
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

MatchItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default MatchItem
