import React from 'react'
import { useState, useEffect } from 'react'
import {Chatbot} from "react-chatbot-kit";
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import config from './config';

const Chatbots = ({ isOpen, onClose }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(isOpen);

  useEffect(() => {
    setIsChatbotOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsChatbotOpen(false);
    onClose();
  };

  return (
    <div className={`chatbot-container ${isChatbotOpen ? 'open' : ''}`}>
      <div className="chatbot-header">
        <span className="chatbot-title">Chatbot</span>
        <button className="close-button" onClick={handleClose}>
          &#x2716; {/* Close (X) symbol */}
        </button>
      </div>
      <div className="chatbot-interface">
        <Chatbot
          config ={config}
          actionProvider = {ActionProvider}
          messageParser = {MessageParser}
        />
      </div>
    </div>
  );
};
      
    

export default Chatbots

 




