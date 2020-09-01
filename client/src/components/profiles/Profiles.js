import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'
import { getProfiles, getCurrentProfile } from '../../actions/profile'
import { loadUser } from '../../actions/auth'

const Profiles = () => {
  const { user } = useSelector((state) => state.auth)
  const {
    profile: { location },
    profiles,
    loading
  } = useSelector((state) => state.profile)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfiles())
    dispatch(getCurrentProfile())
    dispatch(loadUser())
  }, [dispatch])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Creators</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Creators in your area
          </p>
          <div className="profiles">
            {profiles.filter(
              (profile) =>
                !user.matches.includes(profile.user._id) &&
                !user.outgoingRequests.includes(profile.user._id) &&
                profile.location === location
            ).length > 0 ? (
              profiles
                .filter(
                  (profile) =>
                    !user.matches.includes(profile.user._id) &&
                    !user.outgoingRequests.includes(profile.user._id) &&
                    profile.location === location
                )
                .map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default Profiles
