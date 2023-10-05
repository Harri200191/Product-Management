import React, { useState } from 'react';
import './Chat.scss'; 
import {BsArrowRightCircleFill} from "react-icons/bs"
import axios from 'axios';

function Chat() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState(''); 
  const [botResponse, setBotResponse] = useState('');
 
 
  const submitUserInput = async () => {
    try {
      const response = await axios.post('/api/chat', { userInput });
      setBotResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
    setIsMinimized(false); // Reset to open chatbot when clicking the toggle button
  };

  const minimizeChatbot = () => {
    setIsMinimized(!isMinimized);
  };

  const addMessage = (text, isUser = false) => {
    const newMessage = { text, isUser };
    setMessages([...messages, newMessage]);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;
    addMessage(userInput, true);
    // Simulate the chatbot's response (replace with actual chatbot logic)
    simulateChatbotResponse(userInput);
    setUserInput('');
  };

  const simulateChatbotResponse = (userInput) => {
    setTimeout(() => {
      const botResponse = `You said: "${userInput}"`;
      addMessage(botResponse);
    }, 1000);
  };

  return (
    <div className={`chatbot-container ${isChatbotOpen ? 'open' : ''}`}>
      <div className={`chatbot-box ${isMinimized ? 'minimized' : ''}`}>
        <div className="chatbot-header">
          Chatbot
          <button className="minimize-button" onClick={minimizeChatbot}>
            {isMinimized ? 'Expand' : 'Minimize'}
          </button>
        </div>
        <div className={`chatbot-content ${isMinimized ? 'minimized' : ''}`}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.isUser ? 'user' : 'bot'}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        {!isMinimized && (
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={userInput}
              onChange={handleUserInput}
            />
            <button onClick={submitUserInput}><BsArrowRightCircleFill size={18}/></button>
            <p>{botResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
