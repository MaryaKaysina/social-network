import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProfileLeft from '@components/profileLeft/ProfileLeft';
import ProfileCard from '@components/profileCard/ProfileCard';
import PostSide from '@components/postSide/PostSide';
import RightSide from '@components/rightSide/RightSide';

import "./profile.css";

const Profile = () => {
  const user = useSelector((state) => state.authReducer.authData.userData);
  const params = useParams();
  const profileUserId = params.id;
  const isProfileUser = profileUserId === user?._id;

  return (
    <div className='profile'>
      <ProfileLeft />
      <div className="profileCenter">
        <ProfileCard location='profilePage' />
        <PostSide isProfileUser={isProfileUser} />
      </div>
      <RightSide />
    </div>
  )
}

export default Profile;