import React from 'react';
import LogoSearch from '@components/logoSearch/LogoSearch';
import ProfileCard from '@components/profileCard/ProfileCard';
import FollowersCard from '@components/followersCard/FollowersCard';

const ProfileSide = () => {
  return (
    <div className='pageLeft'>
      <LogoSearch />
      <ProfileCard location='homePage' />
      <FollowersCard />
    </div>
  )
}

export default ProfileSide;