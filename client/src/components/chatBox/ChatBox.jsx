import React from 'react';
import { format } from 'timeago.js';
import InputEmoji from "react-input-emoji";

import { useGetUserData } from '@core/hooks/useGetUserData';
import { useGetMessages } from '@core/hooks/useGetMessages';

import { addMessage } from '@core/api/MessageRequest';

import UserChat from '@components/userChat/UserChat';

import "./chatBox.css";

const ChatBox = ({ chat, currentUserId, setSendMessage, receivedMessage }) => {
  const [newMessage, setNewMessage] = React.useState('');
  const userData = useGetUserData(chat, currentUserId);
  const [messages, setMessages] = useGetMessages(chat, currentUserId);
  const scroll = React.useRef();

  React.useEffect(() => {
    if (receivedMessage && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage])

  React.useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  }

  const handleSend = async () => {
    if (newMessage.length === 0) return;

    const message = {
      senderId: currentUserId,
      text: newMessage,
      chatId: chat._id
    }

    try {
      const { data } = await addMessage(message);
      setNewMessage('');
      setMessages([...messages, data]);
    } catch (error) {
      console.log(error);
    }

    const receiverId = chat.members.find((id) => id !== currentUserId);
    setSendMessage({ ...message, receiverId })
  }

  const handleSendBtn = async (e) => {
    e.preventDefault();
    handleSend();
  }

  return (
    <div className="chatBox">
      <div className="chatBoxContainer">
        {chat && (
          <>
            <div className="chatBoxHeader">
              <UserChat userData={userData} isClick={false} />
              <hr className='hr hr--small  hr--long' />
            </div>
            <div className="chatBoxBody">
              {messages.map((message) => (
                <div 
                  ref={scroll}
                  key={message._id}
                  className={message.senderId === currentUserId
                    ? 'message own'
                    : 'message'}
                >
                  <span className="messageText">{message.text}</span>
                  <span className="messageTime">{format(message.createdAt)}</span>
                </div>
              ))}
            </div>
            <div className="chatBoxSender">
              <div className="chatBoxAdd">+</div>
              <InputEmoji
                className="chatBoxInput"
                value={newMessage}
                onChange={handleChange}
                onEnter={handleSend}
              />
              <button className="btn sendBtn" onClick={handleSendBtn}>Send</button>
            </div>
          </>
        )}
        {!chat && (
          <span className="chatBoxEmpty">
            Tap on a Chat to start conversation
          </span>
        )}
      </div>
    </div>
  );
}

export default ChatBox;