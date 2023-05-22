import React from 'react';
import PostShare from '@components/postShare/PostShare';
import Posts from '@components/posts/Posts';

import "./postSide.css";

const PostSide = ({ isProfileUser = true }) => {
  return (
    <div className='postSide'>
      {isProfileUser && <PostShare />}
      <Posts />
    </div>
  )
}

export default PostSide;