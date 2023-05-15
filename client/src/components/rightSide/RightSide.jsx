import React from 'react';
import { Link } from 'react-router-dom';
import TrendCard from '@components/trendCard/TrendCard';
import ShareModal from '@components/shareModal/ShareModal';

import Home from '@core/img/home.png';
import Notification from '@core/img/noti.png';
import Comment from '@core/img/comment.png';
import { UilSetting } from '@iconscout/react-unicons';

import "./rightSide.css";

const RightSide = () => {
  const [isModalOpened, setIsModalOpened] = React.useState(false);

  return (
    <div className='rightSide'>
      <div className="rightSideNav">
        <Link to={`/home`}>
          <img className="navIcon" src={Home} alt="" />
        </Link>
        <UilSetting className="navIcon" />
        <img className="navIcon" src={Notification} alt="" />
        <img className="navIcon" src={Comment} alt="" />
      </div>
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