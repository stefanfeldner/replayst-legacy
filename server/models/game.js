// const mongoose = require('./');
const Genre = require('./genre');
const Platform = require('./platform');

// const { Schema } = mongoose;

// const newGame = Schema({
//   id: Number,
//   slug: String,
//   description: String,
//   metacritic: Number,
//   released: String,
//   background_image: String,
//   website: String,
//   genres: [Genre], // CHECK POPULATION FOR REFACTORING
//   platforms: [Platform]
// });

// const Game = mongoose.model('game', newGame);

// module.exports = Game;

module.exports = {
  id: Number,
  slug: String,
  description: String,
  metacritic: Number,
  released: String,
  background_image: String,
  website: String,
  genres: [Genre],
  platforms: [Platform]
};