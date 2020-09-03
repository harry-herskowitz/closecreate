import api from '../utils/api'
import { GET_CHAT, CHAT_ERROR } from './types'

// Get chat
export const getChat = (id1, id2) => async (dispatch) => {
  try {
    const res = await api.get(`/chat/${id1}&${id2}`)

    dispatch({
      type: GET_CHAT,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: CHAT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Create or update chat
export const createChat = (id1, id2, messages) => async (dispatch) => {
  try {
    const res = await api.post(`/chat/${id1}&${id2}`, messages)

    dispatch({
      type: GET_CHAT,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: CHAT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}
