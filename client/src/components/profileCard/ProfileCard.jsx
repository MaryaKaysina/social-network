import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { useGetUser } from '@core/hooks/useGetUser';

import "./profileCard.css";

const ProfileCard = ({ location }) => {
  const user = useSelector((state) => state.authReducer.authData.userData);
  const [currentUser, setCurrentUser] = React.useState(user);
  const posts = useSelector((state) => state.postReducer.posts);
  const params = useParams();
  const profileUserId = params.id;
  const isProfileUser = profileUserId === user?._id;

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const isProfilePage = location === 'profilePage';
  const styleBottom = isProfilePage ? {marginBottom: '1rem'} : {};
  const profileUser = useGetUser(isProfileUser, user, profileUserId);

  React.useEffect(() => {
    isProfilePage
      ? setCurrentUser(profileUser)
      : setCurrentUser(user)
  }, [isProfilePage, profileUser, user])

  return (
    <div className='profileCard'>
      <div className='profileImages'>
        <img 
          className='profileCover' 
          src={currentUser.coverPicture 
            ? serverPublic + currentUser.coverPicture 
            : serverPublic + 'defaultCover.jpg'} 
          alt='Фон' 
        />
        <img 
          className='profileImage' 
          src={currentUser.profilePicture 
            ? serverPublic + currentUser.profilePicture 
            : serverPublic + 'defaultProfile.png'}  
          alt='Аватар пользователя' 
        />
      </div>
      <div className="profileInfo">
        <span className="profileName">
          {currentUser.firstname} {currentUser.lastname}
        </span>
        <span className="profileJob">
          {currentUser.about ? currentUser.about : 'Write about yourself'}
        </span>
      </div>
      <div className="followsStatus">
        <hr className='hr'/>
        <div className="followsContainer">
          <div className="follow">
            <span className="followNum">{currentUser.following?.length}</span>
            <span className="followLabel">Following</span>
          </div>
          <div className="verticalLine"></div>
          <div className="follow">
            <span className="followNum">{currentUser.followers?.length}</span>
            <span className="followLabel">Followers</span>
          </div>
          {isProfilePage && (
            <>
              <div className="verticalLine"></div>
              <div className="follow">
                <span className="followNum">
                  {posts.filter((post) => post.userId === currentUser._id).length}
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