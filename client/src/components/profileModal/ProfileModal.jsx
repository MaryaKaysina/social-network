import React from 'react';
import { Modal, useMantineTheme } from '@mantine/core';

import "./profileModal.css";

const ProfileModal = ({ isOpen, setIsOpen }) => {
  const theme = useMantineTheme();
  const themeColor = theme.colorScheme === 'dark' 
    ? theme.colors.dark[9] 
    : theme.colors.gray[2];

  return (
    <>
      <Modal 
        opened={isOpen} 
        onClose={() => setIsOpen(false)} 
        overlayColor={themeColor}
        overlayOpacity={0.55}
        overlayBlur={3}
        size='55%'
        radius={10}
      >
        <form className="profileModalForm">
          <h4 className="profileModalTitle">Your Info</h4>
          <div className="profileModalBlock">
            <input 
              className="profileModalInput" 
              type="text" 
              placeholder='First Name' 
              name='firstName'
            />
            <input 
              className="profileModalInput" 
              type="text" 
              placeholder='Last Name' 
              name='lastName'
            />
          </div>
          <div className="profileModalBlock">
            <input 
              className="profileModalInput" 
              type="text" 
              placeholder='Work at' 
              name='work'
            />
          </div>
          <div className="profileModalBlock">
            <input 
              className="profileModalInput" 
              type="text" 
              placeholder='Lives in' 
              name='lives'
            />
            <input 
              className="profileModalInput" 
              type="text" 
              placeholder='Country' 
              name='country'
            />
          </div>
          <div className="profileModalBlock">
            <input 
              className="profileModalInput" 
              type="text" 
              placeholder='Relationship Status' 
              name='relationship'
            />
          </div>
          <div className="profileModalBlock">
            <span className="profileModalImg">Profile Image</span>
            <input type="file" name='profileImage' />
            <span className="profileModalImg">Cover Image</span>
            <input type="file" name='coverImage' />
          </div>
          <button className="btn btn--profileModalForm">Update</button>
        </form>
      </Modal>
    </>
  )
}

export default ProfileModal;