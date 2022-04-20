const mongoose = require('mongoose');

const settings = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect('mongodb://localhost:27017/replayst',
  settings,
  (err) => {
    if (err) {
    console.log(`😞 Sorry, something went wrong! ${err}`);
    } else {
      console.log(`🦆 Database (sessions) connected @ port 27017`);
    }
  }
);

module.exports = mongoose;