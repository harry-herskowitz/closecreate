import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_PROFILES,
  ADD_REQUEST,
  ADD_MATCH
} from '../actions/types'

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {}
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_PROFILE:
    case ADD_REQUEST:
    case ADD_MATCH:
      return {
        ...state,
        profile: payload,
        loading: false
      }
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      }
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      }
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null
      }
    default:
      return state
  }
}
