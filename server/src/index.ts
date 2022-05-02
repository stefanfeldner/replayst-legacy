import Express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./router";

import config from 'config';

const app = Express();


// TODO add specific CORS logic --> This works with the iphone simulator if run using xCode
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions)).use(morgan('short')).use(Express.json()).use(router);

const PORT:number = config.get<number>('PORT')|| 3000;

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Up and running at http://localhost:${PORT}`);
});
