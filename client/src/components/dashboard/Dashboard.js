import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ProfileInfo from './ProfileInfo'
import { getCurrentProfile } from '../../actions/profile'

const Dashboard = () => {
  const { profile } = useSelector((state) => state.profile)
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    if (user !== {}) {
      dispatch(getCurrentProfile())
    }
  }, [dispatch, user])

  return (
    <>
      {profile === null || Object.entries(user).length === 0 ? (
        <div className="card">
          <p>Welcome! Create a Profile to get started</p>
          <Link to="/create-profile" className="btn btn-primary">
            Create Profile
          </Link>
        </div>
      ) : (
        <div className="card">
          <div className="card-content">
            <ProfileInfo profile={profile} user={user} />
          </div>

          <div className="row justify-content-center">
            <Link to="/edit-profile" className="btn btn-dark">
              Edit Profile
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

Dashboard.propTypes = {
  match: PropTypes.object.isRequired
}

export default Dashboard
