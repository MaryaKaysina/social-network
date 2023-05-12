import bcrypt from 'bcrypt';
import UserModel from "../Models/userModel.js";
import { getDataUser } from '../utils/getDataUser.js';

export const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  const { username } = req.body;
  try {
    const oldUser = await UserModel.findByField('username', '==', username);
    if (oldUser) return res.status(400).json('User is already exists');

    const newUser = new UserModel(...req.body);
    const user = await UserModel.create(newUser);
    res.status(200).json(getDataUser(user));
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
    validity 
      ? res.status(200).json(getDataUser(user)) 
      : res.status(404).json('Wrong password');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};