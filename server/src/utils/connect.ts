import mongoose from "mongoose";
import config from "config";
import log from "./logger";

// const settings = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// };

function connect() {
  mongoose.connect(config.get<string>('LOCAL_DB'), (err: any) => { // settings
    if (err) {
      log.info(`😞 Sorry, something went wrong! ${err}`);
    } else {
     log.info(`🦆 Database connected @ port 27017`);
    }
  })
};

export default connect