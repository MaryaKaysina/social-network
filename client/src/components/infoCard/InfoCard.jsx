import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetUser } from '@core/hooks/useGetUser';

import { logOut } from '@core/state/actions/AuthActions';
import ProfileModal from '@components/profileModal/ProfileModal';

import { UilPen } from '@iconscout/react-unicons';

import "./infoCard.css";

const InfoCard = () => {
  const [isModalOpened, setIsModalOpened] = React.useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;
  const user = useSelector((state) => state.authReducer.authData.userData);
  const isProfileUser = profileUserId === user?._id;
  const profileUser = useGetUser(isProfileUser, user, profileUserId);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className='infoCard'>
      <div className="infoCardHead">
        <h4 className="infoCardTitle">
          {isProfileUser ? 'Your' : 'Profile'} Info
        </h4>
        {isProfileUser && (
          <>
            <UilPen 
              className="infoCardIcon" 
              onClick={() => setIsModalOpened(true)}
            />
            <ProfileModal 
              isOpen={isModalOpened}
              setIsOpen={setIsModalOpened}
              data={user}
            />
          </>
        )}
      </div>
      <div className="infoCardItem">
        <span className="infoCardLabel">Status</span>
        <span className="infoCardInfo">{profileUser.relationship}</span>
      </div>
      <div className="infoCardItem">
        <span className="infoCardLabel">Lives in</span>
        <span className="infoCardInfo">{profileUser.livesIn}</span>
      </div>
      <div className="infoCardItem">
        <span className="infoCardLabel">Works at</span>
        <span className="infoCardInfo">{profileUser.worksAt}</span>
      </div>
      <button className="btn btn--logout" onClick={handleLogOut}>
        Logout
      </button>
    </div>
  )
}

export default InfoCard;