const mongoose = require('./');
const Game = require('./game');

const  { Schema } = mongoose;

const newUser = Schema({
  email: { type: String, required: true },
  nickname: String,
  name: { type: String, required: true },
  surname: { type: String, required: true },
  password: { type: String, required: true },
  owned: [Game],
  wishlist: [Game],
  favorites: [Game]
});

const User = mongoose.model('user', newUser);

module.exports = User;