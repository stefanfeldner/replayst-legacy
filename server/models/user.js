const mongoose = require('./');
const Game = require('./game');

const Schema = new mongoose.Schema;

const newUser = new Schema({
  email: { type: String, required: true },
  nickname: String,
  name: { type: String, required: true },
  surname: { type: String, required: true },
  password: { type: String, required: true },
  collection: [Game],
  wishlist: [Game],
  favorites: [Game]
});

const User = mongoose.model('user', newUser);

module.exports = User;