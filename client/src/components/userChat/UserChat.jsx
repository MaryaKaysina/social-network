import React from 'react';

import './userChat.css';

const UserChat = ({ userData, online, isClick = true }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  
  return (
    <div className={isClick ? 'userChat userChat--hover' : 'userChat'}>
      <div className={isClick && online ? 'userChatOnlineDot' : ''}></div>
      <img 
        className='userChatImg' 
        src={userData?.profilePicture 
          ? serverPublic + userData?.profilePicture 
          : serverPublic + 'defaultProfile.png'} 
        alt='Users avatar' 
      />
      <div className={isClick 
        ? 'userChatBlock userChatBlock--hidden' 
        : 'userChatBlock'}
      >
        <span className='userChatName'>
          {userData?.firstname} {userData?.lastname}
        </span>
        {isClick && online && (
          <span className='userChatStatus'>Online</span>
        )}
        {isClick && !online && (
          <span className='userChatStatus'>Offline</span>
        )}
      </div>
    </div>
  );
}

export default UserChat;