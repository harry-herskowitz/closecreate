import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../layout/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import { deleteAccount, getCurrentProfile } from '../../actions/profile'

const Dashboard = () => {
  const { profile } = useSelector((state) => state.profile)
  const auth = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    if (auth.user._id) {
      dispatch(getCurrentProfile())
    }
  }, [auth.user])

  return (
    <>
      {profile === null ? (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      ) : (
        <>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <>
                <Link to="/edit-profile" className="btn btn-dark">
                  Edit Profile
                </Link>
                <div className="my-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => dispatch(deleteAccount())}
                  >
                    <i className="fas fa-user-minus" /> Delete My Account
                  </button>
                </div>
              </>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
        </>
      )}
    </>
  )
}

Dashboard.propTypes = {
  match: PropTypes.object.isRequired
}

export default Dashboard
