import React from 'react';
import { userChats } from '@core/api/ChatRequest';

export const useGetChats = (user) => {
  const [chats, setChats] = React.useState([]);

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

  return chats;
}