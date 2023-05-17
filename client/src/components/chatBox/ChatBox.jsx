import React from 'react';
import { format } from 'timeago.js';
import InputEmoji from "react-input-emoji";

import { getUser } from '@core/api/UserRequest';
import { getMessages } from '@core/api/MessageRequest';

import UserChat from '@components/userChat/UserChat';

import "./chatBox.css";

const ChatBox = ({ chat, currentUserId, setSendMessage, receivedMessage }) => {
  const [userData, setUserData] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState('');

  React.useEffect(() => {
    let isSubscribed = true;
    const userId = chat?.members?.find((id) => id !== currentUserId);

    const getUserData = async () => {
      if (!chat) return;
      try {
        const { data } = await getUser(userId);
        if (isSubscribed) setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData()
      .catch(console.error);

    return () => isSubscribed = false;
  }, [chat, currentUserId]);

  React.useEffect(() => {
    let isSubscribed = true;

    const fetchMessages = async () => {
      if (!chat) return;
      try {
        const { data } = await getMessages(chat._id);
        if (isSubscribed) setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages()
      .catch(console.error);

    return () => isSubscribed = false;
  }, [chat, currentUserId]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
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
                cleanOnEnter
              />
              <button className="btn sendBtn">Send</button>
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