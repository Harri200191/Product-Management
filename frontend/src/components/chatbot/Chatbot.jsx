import React from 'react'
import Chatbot from "react-chatbot-kit";
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import config from './config';

const Chatbot = () => {
  return (
    <div>
      <Chatbot
        config ={config}
        actionProvider = {ActionProvider}
        messageParser = {MessageParser}
      />

      <h1>Chatbot For You</h1>
      <p>Just to test</p>
    </div>
  )
}

export default Chatbot