"use strict";

const express = require("express");
const backpack = require("./backpack-api");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", backpack);
// app.use("/", scores);

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
