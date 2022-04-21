const mongoose = require('./');
const Genre = require('./genre');
const Platform = require('./platform');
const Developer = require('./developer');

const { Schema } = mongoose;

const newGame = Schema({
  id: Number,
  name: String,
  slug: String,
  description: String,
  metacritic: Number,
  released: String,
  background_image: String,
  website: String,
  genres: [{ type: Schema.Types.ObjectId, ref: 'Genre' }], // CHECK POPULATION FOR REFACTORING
  platforms: [{ type: Schema.Types.ObjectId, ref: 'Platform' }],
  developers: [{ type: Schema.Types.ObjectId, ref: 'Developer' }]
});

const Game = mongoose.model('Game', newGame);

module.exports = Game;

// module.exports = {
//   id: Number,
//   name: String,
//   slug: String,
//   description: String,
//   metacritic: Number,
//   released: String,
//   background_image: String,
//   website: String,
//   genres: [Genre],
//   platforms: [Platform],
//   developers: [Developer]
// };
