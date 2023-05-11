import React from 'react';
import {FollowersData} from '@core/data/FollowersData'

import "./followersCard.css";

const FollowersCard = () => {
  return (
    <div className='followersCard'>
      <h3>Who is following you</h3>
      {FollowersData.map((follower) => {
        return (
          <div key={follower.id} className="follower">
            <div className="followerContainer">
              <img className="followerImg" src={follower.img} alt="Аватар пользователя" />
              <div className="followerInfo">
                <span className="followerName">{follower.name}</span>
                <span className="followerUsername">@{follower.username}</span>
              </div>
            </div>
            <button className="btn followerBtn">Follow</button>
          </div>
        )
      })}
    </div>
  )
}

export default FollowersCard;