require('dotenv').config();
const Express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router');
const app = Express();

const PORT = process.env.PORT || 3000;

//TODO add specific CORS logic --> This works with the iphone simulator if run using xCode
const corsOptions = {
  origin: "http://localhost:19006",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions)).use(morgan('short')).use(Express.json()).use(router);


app.listen(PORT, () => {
  console.log(`Up and running at http://localhost:${PORT}`);
});
