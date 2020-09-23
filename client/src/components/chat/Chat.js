import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { createChat, getChat } from '../../actions/chat'

const Chat = ({ match }) => {
  const dispatch = useDispatch()

  const { chat } = useSelector((state) => state.chat)
  const { user } = useSelector((state) => state.auth)

  const [messages, setMessages] = useState(chat.messages)
  const [message, setMessage] = useState('')

  const socketRef = useRef()

  useEffect(() => {
    dispatch(getChat(match.params.id1, match.params.id2))
    socketRef.current = io.connect('/')
    socketRef.current.on('message', (message) => {
      receivedMessage(message)
    })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (messages.length > 0) {
      dispatch(createChat(match.params.id1, match.params.id2, messages))
    }
  }, [dispatch, match.params.id1, match.params.id2, messages])

  function receivedMessage(message) {
    setMessages((oldMsgs) => [...oldMsgs, message])
  }

  function sendMessage(e) {
    e.preventDefault()
    const messageObject = {
      body: message,
      user: user._id
    }
    setMessage('')
    setMessages(chat.messages)
    socketRef.current.emit('send message', messageObject)
  }

  function handleChange(e) {
    setMessage(e.target.value)
  }

  return (
    <>
      {chat === null ? (
        <div />
      ) : (
        <div className="chat">
          <ul>
            {chat.messages.map((message, index) => {
              if (message.user === user._id) {
                return (
                  <div key={index}>
                    <li className="chatbubble me">{message.body}</li>
                  </div>
                )
              }
              return (
                <div key={index}>
                  <li className="chatbubble them">{message.body}</li>
                </div>
              )
            })}
          </ul>
          <form onSubmit={sendMessage}>
            <input
              className="form-control"
              value={message}
              onChange={handleChange}
              placeholder="Say something..."
            />
            <button className="btn btn-light float-right">Send</button>
          </form>
        </div>
      )}
    </>
  )
}

export default Chat
