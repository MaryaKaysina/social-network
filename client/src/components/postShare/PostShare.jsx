import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uploadImage, uploadPost } from '@core/state/actions/UploadActions';

import ProfileImg from '@core/img/profileImg.jpg';
import { 
  UilScenery, 
  UilPlayCircle, 
  UilLocationPoint, 
  UilSchedule,
  UilTimes 
} from '@iconscout/react-unicons';

import "./postShare.css";

const imagesType = [
  "image/png",
  'image/jpeg',
  'image/avif',
  'image/bmp',
  'image/svg+xml',
  'image/webp'
];

const PostShare = () => {
  const [image, setImage] = React.useState(null);
  const [formError, setFormError] = React.useState(false);
  const imageRef = React.useRef(null);
  const descRef = React.useRef(null);

  const user = useSelector((state) => state.authReducer.authData.userData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const dispatch = useDispatch();

  const handleImageClose = () => {
    setImage(null);
    imageRef.current.value = null;
  };

  const resetForm = () => {
    handleImageClose();
    descRef.current.value = null;
  }

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!descRef.current.value) return setFormError(true);

    const newPost = {
      userId: user._id,
      desc: descRef.current.value
    }

    if(image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append('name', fileName);
      data.append('file', image, image.name);
      newPost.image = fileName;

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(uploadPost(newPost));
    resetForm();
  }

  return (
    <form className='postShare' encType="multipart/form-data">
      <img src={ProfileImg} alt="" className="postShareAvatar" />
      <div className="postShareInput">
        <input 
          className={formError 
            ? "postShareText postShareText--error" 
            : "postShareText"} 
          type="text" 
          placeholder="What's happening" 
          required
          ref={descRef}
        />
        <div className="postShareOptions">
          <div 
            className="postShareOption postShareOption--photo"
            onClick={() => imageRef.current.click()}
          >
            <UilScenery/>
            Photo
          </div>
          <div className="postShareOption postShareOption--video">
            <UilPlayCircle/>
            Video
          </div>
          <div className="postShareOption postShareOption--location">
            <UilLocationPoint/>
            Location
          </div>
          <div className="postShareOption postShareOption--shedule">
            <UilSchedule/>
            Shedule
          </div>
          <button 
            className="btn postShareBtn" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Share'}
          </button>
          <input 
            className='hidden' 
            type="file" 
            accept={imagesType.join(',')}
            name="myImage" 
            ref={imageRef} 
            onChange={handleImageChange}
          />
        </div>

        {image && (
          <div className="previewImageBlock">
            <UilTimes 
              className="previewImageClose" 
              onClick={handleImageClose}
            />
            <img className="previewImage" src={URL.createObjectURL(image)} alt=""/>
          </div>
        )}
      </div>
    </form>
  )
}

export default PostShare;