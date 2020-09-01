import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../layout/Spinner'
import MatchItem from './MatchItem'
import { getProfiles } from '../../actions/profile'

const Matches = () => {
  const { user } = useSelector((state) => state.auth)
  const { profiles, loading } = useSelector((state) => state.profile)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfiles())
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
            {user.matches.length > 0 ? (
              profiles
                .filter((profile) => user.matches.includes(profile.user._id))
                .map((profile) => (
                  <MatchItem key={profile._id} profile={profile} />
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

export default Matches
