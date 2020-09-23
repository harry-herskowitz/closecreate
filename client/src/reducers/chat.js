import { GET_CHAT, CHAT_ERROR, CLEAR_CHAT } from '../actions/types'

const initialState = {
  chat: {
    users: [],
    messages: []
  },
  loading: true,
  error: {}
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_CHAT:
      return {
        ...state,
        chat: payload,
        loading: false
      }
    case CHAT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        chat: {
          users: [],
          messages: []
        }
      }
    case CLEAR_CHAT:
      return {
        ...state,
        loading: false,
        chat: {
          users: [],
          messages: []
        }
      }
    default:
      return state
  }
}
