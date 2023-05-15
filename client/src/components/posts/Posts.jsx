import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '@components/post/Post';
import { getTimelinePosts } from '@core/state/actions/PostActions';

import "./posts.css";

const Posts = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.authData.userData);
  const { posts, loading } = useSelector((state) => state.postReducer);

  React.useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);

  return (
    <div className='posts'>
      {loading && (
        <p className="postsNotFound">
          Fetching posts...
        </p>
      )}
      {!loading && posts.length === 0 && (
        <p className="postsNotFound">
          There are no messages yet. Please share your thoughts with your friends
        </p>
      )}
      {!loading && posts.length > 0 && (
        posts.map((post) => (
          <Post key={post._id} post={post} />
        ))
      )}
    </div>
  )
}

export default Posts;