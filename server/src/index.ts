require('dotenv').config();
import Express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./router"
const app = Express();

const PORT:number = process.env.PORT || 3000;

// TODO add specific CORS logic --> This works with the iphone simulator if run using xCode
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions)).use(morgan('short')).use(Express.json()).use(router);


app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Up and running at http://localhost:${PORT}`);
});
