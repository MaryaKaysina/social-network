import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import "./profileCard.css";

const ProfileCard = ({ location }) => {
  const user = useSelector((state) => state.authReducer.authData.userData);
  const posts = useSelector((state) => state.postReducer.posts);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const isProfilePage = location === 'profilePage';
  const styleBottom = isProfilePage ? {marginBottom: '1rem'} : {};

  return (
    <div className='profileCard'>
      <div className='profileImages'>
        <img 
          className='profileCover' 
          src={user.coverPicture 
            ? serverPublic + user.coverPicture 
            : serverPublic + 'defaultCover.jpg'} 
          alt='Фон' 
        />
        <img 
          className='profileImage' 
          src={user.profilePicture 
            ? serverPublic + user.profilePicture 
            : serverPublic + 'defaultProfile.png'}  
          alt='Аватар пользователя' 
        />
      </div>
      <div className="profileInfo">
        <span className="profileName">
          {user.firstname} {user.lastname}
        </span>
        <span className="profileJob">
          {user.about ? user.about : 'Write about yourself'}
        </span>
      </div>
      <div className="followsStatus">
        <hr className='hr'/>
        <div className="followsContainer">
          <div className="follow">
            <span className="followNum">{user.following.length}</span>
            <span className="followLabel">Following</span>
          </div>
          <div className="verticalLine"></div>
          <div className="follow">
            <span className="followNum">{user.followers.length}</span>
            <span className="followLabel">Followers</span>
          </div>
          {isProfilePage && (
            <>
              <div className="verticalLine"></div>
              <div className="follow">
                <span className="followNum">
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
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
        <Link to={`/profile/${user._id}`} className="profileBtn">
          My Profile
        </Link>
      )}
    </div>
  )
}

export default ProfileCard;