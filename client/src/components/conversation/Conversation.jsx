import React from 'react';

import { useGetUserData } from '@core/hooks/useGetUserData';

import UserChat from '@components/userChat/UserChat';

import "./conversation.css";

const Conversation = ({ data, currentUserId, online }) => {
  const userData = useGetUserData(data, currentUserId);

  return (
    <>
      <UserChat userData={userData} online={online} />
      <hr className='hr hr--small' />
    </>
  );
}

export default Conversation;