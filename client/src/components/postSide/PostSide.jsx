import React from 'react';
import PostShare from '@components/postShare/PostShare';
import Posts from '@components/posts/Posts';

import "./postSide.css";

const PostSide = () => {
  return (
    <div className='postSide'>
      <PostShare />
      <Posts />
    </div>
  )
}

export default PostSide;