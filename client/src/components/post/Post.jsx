import React from 'react';

import Comment from '@core/img/comment.png';
import Share from '@core/img/share.png';
import Like from '@core/img/like.png';
import NotLike from '@core/img/notlike.png';

import "./post.css";

const Post = ({ post }) => {
  return (
    <div className='post'>
      <img className="postImg" src={post.img} alt="Картинка поста" />
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