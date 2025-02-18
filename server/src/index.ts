import Express from "express";
import cors from "cors";
import morgan from "morgan";
import config from 'config';

import connect from "./utils/connect";
import log from "./utils/logger";
import routes from "./router";


const app = Express();

const corsOptions = {
  origin: "http://localhost:19006",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions)).use(morgan('short')).use(Express.json());

const PORT:number = config.get<number>('PORT');

app.listen(PORT, async () => {

  log.info(`Up and running at http://localhost:${PORT}`);

  await connect()
  routes(app)
});
