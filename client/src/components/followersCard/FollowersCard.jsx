import React from 'react';
import User from '@components/user/User';
import { getAllUsers } from '@core/api/UserRequest';

import { useSelector } from 'react-redux';

import "./followersCard.css";

const FollowersCard = () => {
  const [persons, setPersons] = React.useState([]);
  const user = useSelector((state) => state.authReducer.authData.userData);

  React.useEffect(() => {
    const fetchPerson = async () => {
      const { data } = await getAllUsers();
      const users = data.filter((person) => person._id !== user._id)
      setPersons(users);
    };
    fetchPerson();
  }, [user._id]);

  return (
    <div className='followersCard'>
      <h3>People you may know</h3>
      {persons && (
        persons.map((person) => <User key={person._id} person={person}/>)
      )}
    </div>
  )
}

export default FollowersCard;