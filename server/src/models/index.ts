import mongoose from "mongoose";
import config from "config";

// const settings = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// };

mongoose.connect(config.get<string>('LOCAL_DB'), (err: any) => { //settings
  if (err) {
    console.log(`😞 Sorry, something went wrong! ${err}`);
  } else {
    console.log(`🦆 Database connected @ port 27017`);
  }
});
