import React from 'react'
import { useState } from 'react'
import {PiChatsCircleBold} from "react-icons/pi"
import Chatbots from './Chatbot'

const Chat = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const handleButtonClick = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div>
        <button className="chat-button" onClick={handleButtonClick}>
            <PiChatsCircleBold size={35}/>
        </button> 
        <Chatbots isOpen={showChatbot} onClose={() => setShowChatbot(false)} />
    </div>
  )
}

export default Chat