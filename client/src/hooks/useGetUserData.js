import React from 'react';
import { getUser } from '@core/api/UserRequest';

export const useGetUserData = (chat, currentUserId) => {
  const [userData, setUserData] = React.useState(null);

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

  return userData;
};