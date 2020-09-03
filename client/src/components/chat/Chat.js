import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../layout/Spinner'
import io from 'socket.io-client'
import { createChat, getChat } from '../../actions/chat'

const Chat = ({ match }) => {
  const dispatch = useDispatch()

  const { chat } = useSelector((state) => state.chat)
  const { user } = useSelector((state) => state.auth)

  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  const socketRef = useRef()

  useEffect(() => {
    dispatch(getChat(match.params.id1, match.params.id2))

    chat && chat.loading && setMessages(chat.messages)

    socketRef.current = io.connect('/')

    socketRef.current.on('message', (message) => {
      receivedMessage(message)
    })
    if (chat) setMessages(chat.messages)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    dispatch(createChat(match.params.id1, match.params.id2, messages))
    // eslint-disable-next-line
  }, [messages])

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
    socketRef.current.emit('send message', messageObject)
  }

  function handleChange(e) {
    setMessage(e.target.value)
  }

  return (
    <>
      {chat && chat.loading ? (
        <Spinner />
      ) : (
        <div>
          <div>
            {messages.map((message, index) => {
              if (message.user === user._id) {
                return (
                  <div key={index}>
                    <div style={{ color: 'blue' }}>{message.body}</div>
                  </div>
                )
              }
              return (
                <div key={index}>
                  <div>{message.body}</div>
                </div>
              )
            })}
          </div>
          <form onSubmit={sendMessage}>
            <input
              value={message}
              onChange={handleChange}
              placeholder="Say something..."
            />
            <button>Send</button>
          </form>
        </div>
      )}
    </>
  )
}

export default Chat