import React from 'react';
import ProfileModal from '@components/profileModal/ProfileModal';

import { UilPen } from '@iconscout/react-unicons';

import "./infoCard.css";

const InfoCard = () => {
  const [isModalOpened, setIsModalOpened] = React.useState(false);

  return (
    <div className='infoCard'>
      <div className="infoCardHead">
        <h4 className="infoCardTitle">Your Info</h4>
        <UilPen 
          className="infoCardIcon" 
          onClick={() => setIsModalOpened(true)}
        />
        <ProfileModal 
          isOpen={isModalOpened}
          setIsOpen={setIsModalOpened}
        />
      </div>
      <div className="infoCardItem">
        <span className="infoCardLabel">Status</span>
        <span className="infoCardInfo">in Relationship</span>
      </div>
      <div className="infoCardItem">
        <span className="infoCardLabel">Lives in</span>
        <span className="infoCardInfo">Multan</span>
      </div>
      <div className="infoCardItem">
        <span className="infoCardLabel">Works at</span>
        <span className="infoCardInfo">Freelance</span>
      </div>
      <button className="btn btn--logout">Logout</button>
    </div>
  )
}

export default InfoCard;