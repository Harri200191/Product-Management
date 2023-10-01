import React from 'react'
import {PiChatsCircleBold} from "react-icons/pi"
import Chatbot from './Chatbot'

const Chat = () => {
  return (
    <div className="chat-button">
        <i className="fas fa-comment-dots"></i> 
        {
          <button onClick={<Chatbot/>}>
            <PiChatsCircleBold/>
          </button>
          }
    </div>
  )
}

export default Chat