import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProfileItem from './ProfileItem'
import { getProfiles, getCurrentProfile } from '../../actions/profile'
import { loadUser } from '../../actions/auth'

const Profiles = () => {
  const {
    user,
    user: { latitude, longitude }
  } = useSelector((state) => state.auth)
  const { profiles, loading } = useSelector((state) => state.profile)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfiles())
    dispatch(getCurrentProfile())
    dispatch(loadUser())
  }, [dispatch])

  function getDistance(lat1, lon1, lat2, lon2) {
    var R = 6371 // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1) // deg2rad below
    var dLon = deg2rad(lon2 - lon1)
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = R * c // Distance in km
    return d
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  return (
    <>
      {loading ? (
        <div />
      ) : (
        <div>
          {profiles.filter(
            (profile) =>
              !user.matches.includes(profile.user._id) &&
              !user.outgoingRequests.includes(profile.user._id) &&
              (getDistance(
                latitude,
                longitude,
                profile.user.latitude,
                profile.user.longitude
              ) < 30 ||
                profile.user._id === '5f7f339515c8f3094e771a1b')
          ).length > 0 ? (
            profiles
              .filter(
                (profile) =>
                  !user.matches.includes(profile.user._id) &&
                  !user.outgoingRequests.includes(profile.user._id) &&
                  (getDistance(
                    latitude,
                    longitude,
                    profile.user.latitude,
                    profile.user.longitude
                  ) < 30 ||
                    profile.user._id === '5f7f339515c8f3094e771a1b')
              )
              .map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
          ) : (
            <>
              <h4 className="text-center">No profiles found.</h4>
              {!user.latitude && (
                <small className="text-center d-block">
                  Current location unavailable. iPhone user? Make sure you have
                  location services enabled at Settings {'>'} Privacy {'>'}{' '}
                  Location Services {'>'} Safari Websites.
                </small>
              )}
            </>
          )}
        </div>
      )}
    </>
  )
}

export default Profiles
