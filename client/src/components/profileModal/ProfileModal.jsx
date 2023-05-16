import React from 'react';
import { Modal, useMantineTheme } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { UilScenery } from '@iconscout/react-unicons';

import { uploadImage } from '@core/state/actions/UploadActions';
import { updateUser } from '@core/state/actions/UserActions';

import "./profileModal.css";

const imagesType = [
  "image/png",
  'image/jpeg',
  'image/avif',
  'image/bmp',
  'image/svg+xml',
  'image/webp'
];

const ProfileModal = ({ isOpen, setIsOpen, data }) => {
  const [formData, setFormData] = React.useState(data);
  const [profileImage, setProfileImage] = React.useState(null);
  const [coverImage, setCoverImage] = React.useState(null);

  const profileImageRef = React.useRef(null);
  const coverImageRef = React.useRef(null);

  const dispatch = useDispatch();
  const params = useParams();

  const theme = useMantineTheme();
  const themeColor = theme.colorScheme === 'dark' 
    ? theme.colors.dark[9] 
    : theme.colors.gray[2];

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      e.target.name === 'profilePicture' 
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name] : value })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = formData;

    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append('name', fileName);
      data.append('file', profileImage, profileImage.name);
      userData.profilePicture = fileName;

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }

    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append('name', fileName);
      data.append('file', coverImage, coverImage.name);
      userData.coverPicture = fileName;

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(updateUser(params.id, userData));
    setIsOpen(false);
  };

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
              name='firstname'
              onChange={handleChange}
              value={formData.firstname}
            />
            <input 
              className="profileModalInput" 
              type="text" 
              placeholder='Last Name' 
              name='lastname'
              onChange={handleChange}
              value={formData.lastname}
            />
          </div>
          <div className="profileModalBlock">
            <input 
              className="profileModalInput" 
              type="text" 
              placeholder='Work at' 
              name='worksAt'
              onChange={handleChange}
              value={formData.worksAt}
            />
          </div>
          <div className="profileModalBlock">
            <input 
              className="profileModalInput" 
              type="text" 
              placeholder='Lives in' 
              name='livesIn'
              onChange={handleChange}
              value={formData.livesIn}
            />
            <input 
              className="profileModalInput" 
              type="text" 
              placeholder='Country' 
              name='country'
              onChange={handleChange}
              value={formData.country}
            />
          </div>
          <div className="profileModalBlock">
            <input 
              className="profileModalInput" 
              type="text" 
              placeholder='Relationship Status' 
              name='relationship'
              onChange={handleChange}
              value={formData.relationship}
            />
          </div>
          <div className="profileModalBlock">
            <input 
              className="profileModalInput" 
              type="text" 
              placeholder='About' 
              name='about'
              onChange={handleChange}
              value={formData.about}
            />
          </div>
          <div className="profileModalBlock">
            <div 
              className="profileModalImg profileModalImg--photo"
              onClick={() => profileImageRef.current.click()}
            >
              <UilScenery/>
              <span className="profileModalLabel">Profile Image</span>
            </div>
            <div 
              className="profileModalImg profileModalImg--cover"
              onClick={() => coverImageRef.current.click()}
            >
              <UilScenery/>
              <span className="profileModalLabel">Cover Image</span>
            </div>
          </div>
          <button 
            className="btn btn--profileModalForm"
            onClick={handleSubmit}
          >
            Update
          </button>
        </form>
        <input 
          className='hidden' 
          type="file" 
          accept={imagesType.join(',')}
          name='profilePicture' 
          ref={profileImageRef}
          onChange={handleImageChange}
        />
        <input 
          className='hidden' 
          type="file" 
          accept={imagesType.join(',')}
          name='coverPicture' 
          ref={coverImageRef}
          onChange={handleImageChange}
        />
      </Modal>
    </>
  )
}

export default ProfileModal;