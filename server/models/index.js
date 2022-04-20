const mongoose = require('mongoose');

const settings = {
  useNewUrlParses: true,
  useUnifiedTopology: true
}

mongoose.connect(process.env.LOCALDB,
  settings,
  (err) => {
    if (err) {
    console.log(`😞 Sorry, something went wrong! ${err}`);
    } else {
      console.log(`🦆 Database (sessions) connected @ port ${DB_PORT}!`);
    }
  }
);

module.exports = mongoose;