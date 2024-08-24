require("dotenv").config({
  path: "./.env",
});
require("rootpath")();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("routes/index.route");
const { swaggerUIServe,swaggerUISetup } = require("kernels/api-docs");

const app = express();
const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true 
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.disable("x-powered-by");

app.use(bodyParser.json());
router(app);
app.use(express.json());

app.use("/api-docs", swaggerUIServe, swaggerUISetup);

module.exports = app
