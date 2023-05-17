import React from 'react';
import { useSelector } from 'react-redux';

import User from '@components/user/User';
import FollowersModal from '@components/followersModal/FollowersModal';

import { getAllUsers } from '@core/api/UserRequest';

import "./followersCard.css";

const FollowersCard = ({ location }) => {
  const [modalOpened, setModalOpened] = React.useState(false);
  const [persons, setPersons] = React.useState([]);
  const user = useSelector((state) => state.authReducer.authData.userData);

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
  }, [user._id]);

  return (
    <div className={!location ? 'followersCard' : 'followersCard followersCard--modal'}>
      <h3>People you may know</h3>
      {persons && (
        persons.map((person) => <User key={person._id} person={person}/>)
      )}
      {!location && (
        <span className='followersMore' onClick={() => setModalOpened(true)}>
          Show more
        </span>
      )}
      <FollowersModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />
    </div>
  )
}

export default FollowersCard;