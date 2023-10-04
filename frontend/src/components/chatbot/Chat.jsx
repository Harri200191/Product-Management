import React from 'react'
import {PiChatsCircleBold} from "react-icons/pi"
import Chatbot from './Chatbot'

const Chat = () => {
  return (
    <div className="chat-button">
        <i  className="fas fa-comment-dots" onClick={<Chatbot/>}></i> 
        {
            <PiChatsCircleBold/>

          }
    </div>
  )
}

export default Chat