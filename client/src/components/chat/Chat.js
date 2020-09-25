import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { createChat, getChat } from '../../actions/chat'
import InfiniteScroll from 'react-infinite-scroll-component'
import Moment from 'react-moment'

const Chat = ({ match }) => {
  const dispatch = useDispatch()

  const { chat } = useSelector((state) => state.chat)
  const { user } = useSelector((state) => state.auth)

  const [messages, setMessages] = useState(chat.messages)
  const [message, setMessage] = useState('')

  const socketRef = useRef()

  useEffect(() => {
    let isMounted = true
    dispatch(getChat(match.params.id1, match.params.id2))
    socketRef.current = io.connect('/')
    socketRef.current.on('message', (message) => {
      if (isMounted) {
        receivedMessage(message)
      }
    })
    return () => (isMounted = false)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (messages.length > 0) {
      dispatch(createChat(match.params.id1, match.params.id2, messages))
    }
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
          <div
            id="scrollableDiv"
            style={{
              height: 'calc(100vh - 60px)',
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column-reverse'
            }}
          >
            {/*Put the scroll bar always on the bottom*/}
            <InfiniteScroll
              dataLength={chat.messages.length}
              next={() => {}}
              style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
              inverse={true} //
              hasMore={false}
              loader={<h4>Loading...</h4>}
              scrollableTarget="scrollableDiv"
            >
              <ul>
                {chat.messages.map((message, index) => {
                  if (message.user === user._id) {
                    return (
                      <div key={index}>
                        <li className="chatbubble me float-right">
                          {message.body}
                        </li>
                        <li className="chatdate float-right">
                          <Moment fromNow>{message.date}</Moment>
                        </li>
                      </div>
                    )
                  }
                  return (
                    <div key={index}>
                      <li className="chatbubble them float-left">
                        {message.body}
                      </li>
                      <li className="chatdate float-left">
                        <Moment fromNow>{message.date}</Moment>
                      </li>
                    </div>
                  )
                })}
              </ul>
            </InfiniteScroll>
          </div>
          <form onSubmit={sendMessage}>
            <input
              className="form-control"
              value={message}
              onChange={handleChange}
              placeholder="Say something..."
            />
          </form>
        </div>
      )}
    </>
  )
}

export default Chat
