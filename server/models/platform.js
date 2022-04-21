// const mongoose = require('./');

// const { Schema } = mongoose;

// const newPlatform = Schema({
//   id: Number,
//   slug: String,
//   name: String,
//   owned: {
//     type: Boolean,
//     default: false
//   }
// });

// const Platform = mongoose.model('platform', newPlatform);

// module.exports = Platform;

module.exports = {
  id: Number,
  slug: String,
  name: String,
  owned: {
    type: Boolean,
    default: false,
  },
};
