import React from 'react';
import { useSelector } from 'react-redux';
import { io } from "socket.io-client";

import LogoSearch from '@components/logoSearch/LogoSearch';
import Navigation from '@components/navigation/Navigation';
import Conversation from '@components/conversation/Conversation';
import ChatBox from '@components/chatBox/ChatBox';

import { useGetChats } from '@core/hooks/useGetChats';

import "./chat.css";
import { SOCKET_URL } from '@core/const';

const Chat = () => {
  const [currentChat, setCurrentChat] = React.useState(null);
  const [onlineUsers, setOnlineUsers] = React.useState([]);
  const [sendMessage, setSendMessage] = React.useState(null);
  const [receivedMessage, setReceivedMessage] = React.useState(null);
  const user = useSelector((state) => state.authReducer.authData.userData);
  const chats = useGetChats(user);
  const socket = React.useRef();

  React.useEffect(() => {
    socket.current = io(SOCKET_URL);
    socket.current.emit('new-user-add', user._id);
    socket.current.on('get-users', (users) => setOnlineUsers(users));
  }, [user]);

  React.useEffect(() => {
    if (!sendMessage) return;
    socket.current.emit('send-message', sendMessage);
  }, [sendMessage]);

  React.useEffect(() => {
    socket.current.on('receive-message', (data) => setReceivedMessage(data));
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    console.log(online);
    return online ? true : false;
  }

  return (
    <div className="chat">
      <div className="chatLeftSide">
        <LogoSearch />
        <div className="chatContainer">
          <h2>Chats</h2>
          <div className="chatList">
            {chats.map((chat) => (
              <div key={chat._id} onClick={() => setCurrentChat(chat)}>
                <Conversation
                  data={chat}
                  currentUserId={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="chatRightSide">
        <div className="chatRightSideContainer">
          <Navigation />
        </div>
        <ChatBox
          chat={currentChat}
          currentUserId={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
}

export default Chat;