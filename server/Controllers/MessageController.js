import MessageModel from '../Models/messageModel.js';

export const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  try {
    const newMessage = new MessageModel({ chatId, senderId, text });
    const message = await MessageModel.create(newMessage);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  const chatId = req.params.chatId;
  try {
    const messages = await MessageModel.findByField('chatId', '==', chatId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};