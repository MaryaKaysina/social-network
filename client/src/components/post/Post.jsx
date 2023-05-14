import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Comment from '@core/img/comment.png';
import Share from '@core/img/share.png';
import Like from '@core/img/like.png';
import NotLike from '@core/img/notlike.png';

import "./post.css";

const Post = ({ post }) => {
  const user = useSelector((state) => state.authReducer.authData.userData);

  return (
    <div className='post'>
      <img 
        className="postImg" 
        src={post.image 
          ? process.env.REACT_APP_PUBLIC_FOLDER + post.image 
          : ''} 
        alt="Картинка поста" 
      />
      <div className="postReact">
        <img src={post.liked ? Like : NotLike} alt="" />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>
      <span className="postNumberLikes">
        {post.likes} likes
      </span>
      <div className="postInfo">
        <span className="postName">{post.name}</span>
        <span className="postDescr">{post.desc}</span>
      </div>
    </div>
  )
}

export default Post;