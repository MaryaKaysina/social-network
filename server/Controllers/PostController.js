import PostModel from '../Models/postModel.js';
import UserModel from "../Models/userModel.js";

export const createPost = async (req, res) => {
  try {
    const newPost = new PostModel({...req.body});
    const post = await PostModel.create(newPost);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostModel.findById(id);
    if(!post) return res.status(404).json('Post does not exists');

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(postId);
    if(!post) return res.status(404).json('Post does not exists');

    if (post.userId !== userId) {
      return res.status(403).json('Permission denied');
    }

    const updPost = await PostModel.findByIdAndUpdate(postId, req.body);
    res.status(200).json(updPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(postId);
    if(!post) return res.status(404).json('Post does not exists');

    if (post.userId !== userId) {
      return res.status(403).json('Permission denied');
    }

    await PostModel.findByIdAndDelete(postId);
    res.status(200).json('Post deleted successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  let message = '';

  try {
    const post = await PostModel.findById(postId);
    if(!post) return res.status(404).json('Post does not exists');

    if(!post.likes.includes(userId)) {
      post.likes.push(userId);
      message = 'Post liked';
    } else {
      post.likes = post.likes.filter((id) => id !== userId);
      message = 'Post disliked';
    }

    const postLikesData = {
      likes: post.likes,
      updatedAt: Date.now().toString()
    };

    await PostModel.findByIdAndUpdate(postId, postLikesData);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const currentUserPosts = await PostModel.findByField('userId', '==', userId);
    const currentUser = await UserModel.findById(userId);
    const followingPosts = await PostModel.getPosts(currentUser.following);

    const postsAll = currentUserPosts
      .concat(...followingPosts)
      .sort((a, b) => b.createdAt - a.createdAt)

    res.status(200).json(postsAll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};