import React from 'react';

import { getUser } from '@core/api/UserRequest';

import UserChat from '@components/userChat/UserChat';

import "./conversation.css";

const Conversation = ({ data, currentUserId }) => {
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    let isSubscribed = true;
    const userId = data.members.find((id) => id !== currentUserId);

    const getUserData = async () => {
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
  }, []);

  return (
    <>
      <UserChat userData={userData} />
      <hr className='hr hr--small' />
    </>
  );
}

export default Conversation;