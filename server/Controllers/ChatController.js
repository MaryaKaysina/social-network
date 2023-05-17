import ChatModel from '../Models/chatModel.js';

export const createChat = async (req, res) => {
  try {
    const newChat = new ChatModel({
      members: [req.body.senderId, req.body.receiverId]
    });
    const chat = await ChatModel.create(newChat);
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userChats = async (req, res) => {
  const userId = req.params.userId;
  try {
    const chats = await ChatModel
      .findByField('members', 'array-contains', userId);
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findChat = async (req, res) => {
  const firstId = req.params.firstId;
  const secondId = req.params.secondId;
  const find = [[firstId, secondId], [secondId, firstId]];

  try {
    const chat = await ChatModel
      .findByField('members', 'in', find);
    res.status(200).json(chat[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};