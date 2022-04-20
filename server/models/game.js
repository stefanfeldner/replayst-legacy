const mongoose = require('./');
const Genre = require('./genre');
const Platform = require('./platform');

const Schema = new mongoose.Schema;

const newGame = new Schema({
  id: Number,
  slug: String,
  description: String,
  metacritic: Number,
  released: String,
  background_image: String,
  webstie: String,
  genres: [Genre],
  platforms: [Platform]

});

const Game = mongoose.model('game', newGame);

module.exports = Game;