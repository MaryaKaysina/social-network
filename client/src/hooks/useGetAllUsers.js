import React from 'react';
import { getAllUsers } from '@core/api/UserRequest';

export const useGetAllUsers = (user, location) => {
  const [persons, setPersons] = React.useState([]);

  React.useEffect(() => {
    let isSubscribed = true;

    const fetchPerson = async () => {
      try {
        const { data } = await getAllUsers();
        let users = data.filter((person) => person._id !== user._id);
        if (!location) users = users.slice(0, 4);
        if (isSubscribed) setPersons(users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPerson()
      .catch(console.error);

    return () => isSubscribed = false;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id]);

  return persons;
}