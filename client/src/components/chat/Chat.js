import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { createChat, getChat } from '../../actions/chat'

const Chat = ({ match }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getChat(match.params.id1, match.params.id2))

    socketRef.current = io.connect('/')

    socketRef.current.on('your id', (id) => {
      setYourID(id)
    })

    socketRef.current.on('message', (message) => {
      receivedMessage(message)
    })
  }, [dispatch])

  const { chat } = useSelector((state) => state.chat)

  const [yourID, setYourID] = useState()
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  const socketRef = useRef()

  function receivedMessage(message) {
    setMessages((oldMsgs) => [...oldMsgs, message])
  }

  function sendMessage(e) {
    e.preventDefault()
    const messageObject = {
      body: message,
      id: yourID
    }
    setMessage('')
    socketRef.current.emit('send message', messageObject)
    dispatch(createChat(messages))
  }

  function handleChange(e) {
    setMessage(e.target.value)
  }

  return (
    <div>
      <div>
        {messages.map((message, index) => {
          if (message.id === yourID) {
            return (
              <div key={index}>
                <div>{message.body}</div>
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
  )
}

export default Chat
