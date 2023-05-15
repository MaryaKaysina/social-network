import Model from "./model.js";

class UserModel extends Model('users') {
  constructor({
    username,
    password,
    firstname,
    lastname,
    isAdmin = false,
    profilePicture = '',
    coverPicture = '',
    about = '',
    country = '',
    livesIn = '',
    worksAt = '',
    relationship = '',
    followers = [],
    following = []
  }) {
    super();
    
    if (!username) throw new Error('Field username is required!');
    if (!password) throw new Error('Field password is required!');
    if (!firstname) throw new Error('Field firstname is required!');
    if (!lastname) throw new Error('Field lastname is required!');

    this.username = username,
    this.password = password,
    this.firstname = firstname,
    this.lastname = lastname,
    this.isAdmin = isAdmin,
    this.profilePicture = profilePicture,
    this.coverPicture = coverPicture,
    this.about = about,
    this.livesIn = livesIn,
    this.worksAt = worksAt,
    this.relationship = relationship,
    this.followers = followers,
    this.following = following,
    this.createdAt = Date.now(),
    this.updatedAt = Date.now()
  }
};

export default UserModel;
