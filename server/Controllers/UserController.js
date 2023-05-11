import bcrypt from 'bcrypt';
import UserModel from "../Models/userModel.js";
import { getDataUser } from '../utils/getDataUser.js';

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    if(!user) return res.status(404).json('User does not exists');

    res.status(200).json(getDataUser(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus, password } = req.body;

  if (id !== currentUserId && !currentUserAdminStatus) {
    return res
      .status(403)
      .json('Permission denied. You can only update your own profile');
  }

  try {
    if (password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(password, salt);
    }
    const user = await UserModel.findByIdAndUpdate(id, req.body);
    res.status(200).json(getDataUser(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus } = req.body;

  if (id !== currentUserId && !currentUserAdminStatus) {
    return res
      .status(403)
      .json('Permission denied. You can only delete your own profile');
  }

  try {
    await UserModel.findByIdAndDelete(id);
    res.status(200).json('User deleted successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const followUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;

  if (id === currentUserId) {
    return res.status(403).json('Action forbidden');
  }

  try {
    const followUser = await UserModel.findById(id);
    if(!followUser) return res.status(404).json('User does not exists');

    const followingUser = await UserModel.findById(currentUserId);
    if(!followingUser) return res.status(404).json('User does not exists');

    if(followUser.followers.includes(currentUserId)) {
      return res.status(403).json('User is already followed by you');
    }

    followUser.followers.push(currentUserId);
    const followUserData = {
      followers: followUser.followers,
      updatedAt: Date.now().toString()
    };
    await UserModel.findByIdAndUpdate(id, followUserData);

    followingUser.following.push(id);
    const followingUserData = {
      following: followingUser.following,
      updatedAt: Date.now().toString()
    };
    await UserModel.findByIdAndUpdate(currentUserId, followingUserData);

    res.status(200).json('User followed');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unFollowUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;

  if (id === currentUserId) {
    return res.status(403).json('Action forbidden');
  }

  try {
    const followUser = await UserModel.findById(id);
    if(!followUser) return res.status(404).json('User does not exists');

    const followingUser = await UserModel.findById(currentUserId);
    if(!followingUser) return res.status(404).json('User does not exists');

    if(!followUser.followers.includes(currentUserId)) {
      return res.status(403).json('User is not followed by you');
    }

    followUser.followers = followUser.followers
      .filter((folId) => folId !== currentUserId);
    const followUserData = {
      followers: followUser.followers,
      updatedAt: Date.now().toString()
    };
    await UserModel.findByIdAndUpdate(id, followUserData);

    followingUser.following = followingUser.following
      .filter((folId) => folId !== id);
    const followingUserData = {
      following: followingUser.following,
      updatedAt: Date.now().toString()
    };
    await UserModel.findByIdAndUpdate(currentUserId, followingUserData);

    res.status(200).json('User unfollowed');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
