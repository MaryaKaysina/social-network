import Model from "./model.js";

class ChatModel extends Model('chats') {
  constructor({
    members = [],
    createdAt = Date.now(),
    updatedAt = Date.now()
  }) {
    super();

    this.members = members,
    this.createdAt = createdAt,
    this.updatedAt = updatedAt
  }
};

export default ChatModel;