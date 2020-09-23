import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ProfileInfo from './ProfileInfo'
import { getProfileById } from '../../actions/profile'

const Profile = ({ match }) => {
  const { profile } = useSelector((state) => state.profile)
  const auth = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfileById(match.params.id))
  }, [dispatch, match.params.id])

  return (
    <>
      {profile === null ? (
        <div />
      ) : (
        <div className="card justify-content-center">
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <ProfileInfo profile={profile} />
        </div>
      )}
    </>
  )
}

Profile.propTypes = {
  match: PropTypes.object.isRequired
}

export default Profile
