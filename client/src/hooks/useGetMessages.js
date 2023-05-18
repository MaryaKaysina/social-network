import React from 'react';
import { getMessages } from '@core/api/MessageRequest';

export const useGetMessages = (chat, currentUserId) => {
  const [messages, setMessages] = React.useState([]);

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

  return [messages, setMessages];
}