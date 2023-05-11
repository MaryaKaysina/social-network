import React from 'react';

import Cover from '@core/img/cover.jpg';
import ProfileImg from '@core/img/profileImg.jpg';

import "./profileCard.css";

const ProfileCard = () => {
  const isProfilePage = true;
  const styleBottom = isProfilePage ? {marginBottom: '1rem'} : {};

  return (
    <div className='profileCard'>
      <div className='profileImages'>
        <img className='profileCover' src={Cover} alt='Фон'></img>
        <img className='profileImage' src={ProfileImg} alt='Аватар пользователя'></img>
      </div>
      <div className="profileInfo">
        <span className="profileName">Zendaya MJ</span>
        <span className="profileJob">Senior UI/UX Designer</span>
      </div>
      <div className="followsStatus">
        <hr className='hr'/>
        <div className="followsContainer">
          <div className="follow">
            <span className="followNum">6,890</span>
            <span className="followLabel">Followings</span>
          </div>
          <div className="verticalLine"></div>
          <div className="follow">
            <span className="followNum">1</span>
            <span className="followLabel">Followers</span>
          </div>
          {isProfilePage && (
            <>
              <div className="verticalLine"></div>
              <div className="follow">
                <span className="followNum">3</span>
                <span className="followLabel">Posts</span>
              </div>
            </>
          )}
        </div>
        <hr 
          className="hr" 
          style={styleBottom}
        />
      </div>
      {!isProfilePage && (
        <button className="profileBtn">My Profile</button>
      )}
    </div>
  )
}

export default ProfileCard;