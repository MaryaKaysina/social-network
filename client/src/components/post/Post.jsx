import React from 'react';
import { useSelector } from 'react-redux';
import { likePost } from '@core/api/PostRequest';

import Comment from '@core/img/comment.png';
import Share from '@core/img/share.png';
import Like from '@core/img/like.png';
import NotLike from '@core/img/notlike.png';

import "./post.css";

const Post = ({ post }) => {
  const user = useSelector((state) => state.authReducer.authData.userData);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const isLiked = post.likes.includes(user._id);
  const countLikesPost = post.likes.length;

  const [liked, setLiked] = React.useState(isLiked);
  const [countLikes, setCountLikes] = React.useState(countLikesPost);

  const handleLike = () => {
    liked ? setCountLikes((prev) => --prev) : setCountLikes((prev) => ++prev);
    setLiked((prev) => !prev);
    likePost(post._id, user._id);
  };

  return (
    <div className='post'>
      <img 
        className="postImg" 
        src={post.image ? serverPublic + post.image : ''} 
        alt="Картинка поста" 
      />
      <div className="postReact">
        <img className="postReactIcon" src={liked ? Like : NotLike} alt="Нравиться" onClick={handleLike} />
        <img className="postReactIcon" src={Comment} alt="" />
        <img className="postReactIcon" src={Share} alt="" />
      </div>
      <span className="postNumberLikes">
        {countLikes} likes
      </span>
      <div className="postInfo">
        <span className="postName">{post.name}</span>
        <span className="postDescr">{post.desc}</span>
      </div>
    </div>
  )
}

export default Post;