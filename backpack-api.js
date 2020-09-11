"use strict";
const express = require("express");
const routes = express.Router();
const pool = require("./connection");
const { response } = require("express");

routes.get("/adventures", (req, res) => {
  let queryString = `SELECT * FROM adventures`;
  pool.query(queryString).then((response) => {
    res.json(response.rows);
  });
});

module.exports = routes;
