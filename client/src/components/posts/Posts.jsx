import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '@components/post/Post';
import { getTimelinePosts } from '@core/state/actions/PostActions';

import "./posts.css";
import { useParams } from 'react-router-dom';

const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.authData.userData);
  const followLoading = useSelector((state) => state.authReducer.followLoading);
  const { posts, loading } = useSelector((state) => state.postReducer);
  const [ postsList, setPostsList ] = React.useState(posts);

  React.useEffect(() => {
    if (!followLoading) {
      dispatch(getTimelinePosts(user._id));
    }

    if (params.id) {
      const filterPost = postsList.filter((post) => post.userId === params.id);
      setPostsList(filterPost);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followLoading]);

  return (
    <div className='posts'>
      {loading && (
        <p className="postsNotFound">
          Fetching posts...
        </p>
      )}
      {!loading && postsList.length === 0 && (
        <p className="postsNotFound">
          There are no messages yet. Please share your thoughts with your friends
        </p>
      )}
      {!loading && postsList.length > 0 && (
        postsList.map((post) => (
          <Post key={post._id} post={post} />
        ))
      )}
    </div>
  )
}

export default Posts;