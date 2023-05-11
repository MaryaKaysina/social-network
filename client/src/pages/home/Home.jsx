import React from 'react';
import ProfileSide from '@components/profileSide/ProfileSide';
import PostSide from '@components/postSide/PostSide';
import RightSide from '@components/rightSide/RightSide';

import "./home.css";

const Home = () => {
  return (
    <div className='home'>
      <ProfileSide />
      <PostSide />
      <RightSide />
    </div>
  )
}

export default Home;