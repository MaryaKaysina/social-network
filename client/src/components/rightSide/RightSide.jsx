import React from 'react';

import TrendCard from '@components/trendCard/TrendCard';
import ShareModal from '@components/shareModal/ShareModal';
import Navigation from '@components/navigation/Navigation';

import "./rightSide.css";

const RightSide = () => {
  const [isModalOpened, setIsModalOpened] = React.useState(false);

  return (
    <div className='rightSide'>
      <Navigation />
      <TrendCard />
      <button 
        className="btn btn--rightSide" 
        onClick={() => setIsModalOpened(true)}
      >
        Share
      </button>
      <ShareModal isOpen={isModalOpened} setIsOpen={setIsModalOpened} />
    </div>
  )
}

export default RightSide;