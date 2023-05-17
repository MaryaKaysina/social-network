import React from 'react';
import { Link } from 'react-router-dom';

import Home from '@core/img/home.png';
import Notification from '@core/img/noti.png';
import Comment from '@core/img/comment.png';
import { UilSetting } from '@iconscout/react-unicons';

import "./navigation.css";

const Navigation = () => {
  return (
    <div className="rightSideNav">
      <Link to={`/home`}>
        <img className="navIcon" src={Home} alt="" />
      </Link>
      <UilSetting className="navIcon" />
      <img className="navIcon" src={Notification} alt="" />
      <Link to={`/chat`}>
        <img className="navIcon" src={Comment} alt="" />
      </Link>
    </div>
  )
}

export default Navigation;