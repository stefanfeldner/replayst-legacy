const mongoose = require('mongoose');

const settings = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(process.env.LOCALDB, settings, (err) => {
  if (err) {
    console.log(`😞 Sorry, something went wrong! ${err}`);
  } else {
    console.log(`🦆 Database connected @ port 27017`);
  }
});

module.exports = mongoose;
