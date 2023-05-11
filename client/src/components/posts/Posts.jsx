import React from 'react';
import { PostsData } from '@core/data/PostsData';
import Post from '@components/post/Post';

import "./posts.css";

const Posts = () => {
  return (
    <div className='posts'>
      {PostsData.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Posts;