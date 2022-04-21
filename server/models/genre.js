const mongoose = require('./');

const { Schema } = mongoose;

const newGenre = Schema({
  id: Number,
  slug: String,
  name: String
});

const Genre = mongoose.model('genre', newGenre);

module.exports = Genre;

// module.exports = {
//   id: Number,
//   slug: String,
//   name: String
// }
