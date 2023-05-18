import React from 'react';
import { useSelector } from 'react-redux';

import User from '@components/user/User';
import FollowersModal from '@components/followersModal/FollowersModal';

import { useGetAllUsers } from '@core/hooks/useGetAllUsers';

import "./followersCard.css";

const FollowersCard = ({ location }) => {
  const [modalOpened, setModalOpened] = React.useState(false);
  const user = useSelector((state) => state.authReducer.authData.userData);
  const persons = useGetAllUsers(user, location);

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