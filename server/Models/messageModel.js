import Model from "./model.js";

class MessageModel extends Model('messages') {
  constructor({
    chatId = '',
    senderId = '',
    text = '',
    createdAt = Date.now(),
    updatedAt = Date.now()
  }) {
    super();

    this.chatId = chatId,
    this.senderId = senderId,
    this.text = text,
    this.createdAt = createdAt,
    this.updatedAt = updatedAt
  }
};

export default MessageModel;