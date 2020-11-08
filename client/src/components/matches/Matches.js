import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MatchItem from './MatchItem'
import { getProfiles } from '../../actions/profile'
import { clearChat } from '../../actions/chat'

const Matches = () => {
  const { user } = useSelector((state) => state.auth)
  const { profiles, loading } = useSelector((state) => state.profile)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfiles())
    dispatch(clearChat())
  }, [dispatch])

  return (
    <>
      {loading ? (
        <div />
      ) : (
        <div>
          {user.matches.length > 0 ? (
            profiles
              .filter((profile) => user.matches.includes(profile.user._id))
              .map((profile) => (
                <MatchItem key={profile._id} profile={profile} />
              ))
          ) : (
            <h4 className="text-center">No matches yet.</h4>
          )}
        </div>
      )}
    </>
  )
}

export default Matches
