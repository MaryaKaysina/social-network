import React from 'react';

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
  const imageRef = React.useRef(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      console.log(event.target.files[0]);
      setImage({ image: URL.createObjectURL(img) });
    }
  };

  return (
    <div className='postShare'>
      <img src={ProfileImg} alt="" className="postShareAvatar" />
      <div className="postShareInput">
        <input className="postShareText" type="text" placeholder="What's happening" />
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
          <button className="btn postShareBtn">Share</button>
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
              onClick={() => setImage(null)}
            />
            <img className="previewImage" src={image.image} alt=""/>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostShare;