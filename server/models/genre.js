const mongoose = require('./');

const Schema = new mongoose.Schema;

const newGenre = new Schema({
  id: Number,
  slug: String,
  name: String
});

const Genre = mongoose.model('genre', newGenre);

module.exports = Genre;