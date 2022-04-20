const mongoose = require('./');

const Schema = new mongoose.Schema;

const newPlatform = new Schema({
  id: Number,
  slug: String,
  name: String,
  owned: {
    type: Boolean,
    default: false
  }
});

const Platform = mongoose.model('platform', newPlatform);

module.exports = Platform;