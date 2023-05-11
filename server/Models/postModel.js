import Model from "./model.js";

class PostModel extends Model('posts') {
  constructor(
    userId,
    desc = '',
    likes = [],
    image = '',
    createdAt = Date.now(),
    updatedAt = Date.now()
  ) {
    super();
    
    if (!userId) throw new Error('Field userId is required!');

    this.userId = userId,
    this.desc = desc,
    this.likes = likes,
    this.image = image,
    this.createdAt = createdAt,
    this.updatedAt = updatedAt
  }
};

export default PostModel;
