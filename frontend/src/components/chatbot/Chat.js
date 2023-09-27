import React from 'react'
import {PiChatsCircleBold} from "react-icons/pi"

const Chat = () => {
  return (
    <div className="chat-button">
        <i className="fas fa-comment-dots"></i> 
        {
          <PiChatsCircleBold 
        />}
    </div>
  )
}

export default Chat