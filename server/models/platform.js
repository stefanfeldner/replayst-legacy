const mongoose = require('.');

const { Schema } = mongoose;

const newPlatform = new Schema({
  id: Number,
  slug: String,
  name: String
});

const Platform = mongoose.model('Platform', newPlatform);

module.exports = Platform;
