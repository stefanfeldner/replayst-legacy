const mongoose = require('.');

const { Schema } = mongoose;

const newGenre = new Schema({
  id: Number,
  slug: String,
  name: String
});

const Genre = mongoose.model('Genre', newGenre);

module.exports = Genre;
