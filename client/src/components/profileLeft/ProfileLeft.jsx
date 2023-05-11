import React from 'react';
import LogoSearch from '@components/logoSearch/LogoSearch';
import InfoCard from '@components/infoCard/InfoCard';
import FollowersCard from '@components/followersCard/FollowersCard';

const ProfileLeft = () => {
  return (
    <div className='pageLeft'>
      <LogoSearch />
      <InfoCard/>
      <FollowersCard/>
    </div>
  )
}

export default ProfileLeft;