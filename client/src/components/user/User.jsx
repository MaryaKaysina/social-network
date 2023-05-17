import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { followUser, unFollowUser } from '../../state/actions/UserActions';

import "./user.css";

const User = ({ person }) => {
  const user = useSelector((state) => state.authReducer.authData.userData);
  const isPersonFollowing = person.followers.includes(user._id);
  const [isFollowing, setIsFollowing] = React.useState(isPersonFollowing);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();

  const handleFollow = () => {
    isFollowing 
      ? dispatch(unFollowUser(person._id, user)) 
      : dispatch(followUser(person._id, user));
    setIsFollowing((prev) => !prev);
  }

  return (
    <div key={person.id} className="user">
      <div className="userContainer">
        <img 
          className="userImg" 
          src={person.profilePicture 
            ? serverPublic + person.profilePicture 
            : serverPublic + 'defaultProfile.png'} 
          alt="Users avatar" 
        />
        <div className="userInfo">
          <span className="userName">{person.firstname}</span>
          <span className="userUsername">@{person.username}</span>
        </div>
      </div>
      <button 
        className={isFollowing 
          ? "btn userBtn btn--revert" 
          : "btn userBtn"} 
        onClick={handleFollow}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  )
}

export default User;