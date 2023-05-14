import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from "../Models/userModel.js";
import { getDataUser } from '../utils/getDataUser.js';

export const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  const { username } = req.body;

  try {
    const oldUser = await UserModel.findByField('username', '==', username);

    if (oldUser.length > 0) return res.status(400).json('User is already exists');

    const newUser = new UserModel({...req.body});
    const user = await UserModel.create(newUser);
    const token = jwt.sign(
      { username: user.username, id: user._id }, 
      process.env.JWT_KEY, 
      { expiresIn: '1h' }
    );

    const userData = getDataUser(user);
    res.status(200).json({ userData, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userList = await UserModel.findByField('username', '==', username);
    const user = userList[0];

    if(!user) return res.status(404).json('User does not exists');

    const validity = await bcrypt.compare(password, user.password);
    if(!validity) return res.status(404).json('Wrong password');

    const token = jwt.sign(
      { username: user.username, id: user._id }, 
      process.env.JWT_KEY, 
      { expiresIn: '1h' }
    );

    const userData = getDataUser(user);
    res.status(200).json({ userData, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};