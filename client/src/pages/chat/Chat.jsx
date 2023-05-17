import React from 'react';
import { useSelector } from 'react-redux';

import LogoSearch from '@components/logoSearch/LogoSearch';
import Navigation from '@components/navigation/Navigation';
import Conversation from '@components/conversation/Conversation';
import ChatBox from '@components/chatBox/ChatBox';

import { userChats } from '@core/api/ChatRequest';

import "./chat.css";

const Chat = () => {
  const [chats, setChats] = React.useState([]);
  const [currentChat, setCurrentChat] = React.useState(null);
  const user = useSelector((state) => state.authReducer.authData.userData);

  React.useEffect(() => {
    let isSubscribed = true;

    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        if (isSubscribed) {
          setChats(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getChats()
      .catch(console.error);

    return () => isSubscribed = false;
  }, [user._id]);

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
                  // online={checkOnlineStatus(chat)}
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
          // setSendMessage={setSendMessage}
          // receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
}

export default Chat;