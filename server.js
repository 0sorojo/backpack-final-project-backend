"use strict";

const express = require("express");
const backpack = require("./backpack-api");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", backpack);
// app.use("/", scores);
// define the port
const DEFAULT_PORT = 3000;
// Use Heroku's PORT or default to 3000.
const port = process.env.PORT || DEFAULT_PORT;
// run the server
app.listen(port, () =>
  console.log(`Listening on
port: ${port}.`)
);
