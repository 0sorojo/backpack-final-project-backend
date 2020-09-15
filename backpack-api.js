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

routes.get("/adventures/dailycomplete", (req, res) => {
  let date = new Date();
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let yyyy = date.getFullYear();
  let mm = months[date.getMonth()];
  let dd = date.getDate();
  let constructedDate = `${mm}-${dd}-${yyyy}`;
  let queryString = `SELECT date AS "dateDone", 
  COUNT(completed), subject
  FROM adventures WHERE completed=true AND date='${constructedDate}'
  GROUP BY date, subject`;
  pool.query(queryString).then((response) => {
    res.json(response.rows);
  });
});

routes.get("/adventures/dailyincomplete", (req, res) => {
  let date = new Date();
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let yyyy = date.getFullYear();
  let mm = months[date.getMonth()];
  let dd = date.getDate();
  let constructedDate = `${mm}-${dd}-${yyyy}`;
  let queryString = `SELECT date AS "dateDone", 
  COUNT(completed)
  FROM adventures WHERE completed = false AND date='${constructedDate}'
  GROUP BY date`;
  pool.query(queryString).then((response) => {
    res.json(response.rows);
  });
});

routes.get("/adventures/complete", (req, res) => {
  let queryString = `SELECT subject AS "subject", 
  COUNT(completed) 
  FROM adventures WHERE completed=true
  GROUP BY subject`;
  pool.query(queryString).then((response) => {
    res.json(response.rows);
  });
});

routes.get("/adventures/incomplete", (req, res) => {
  let queryString = `SELECT COUNT(completed) AS "total" FROM adventures WHERE completed = false`;
  pool.query(queryString).then((response) => {
    res.json(response.rows);
  });
});

routes.post("/adventures", (req, res) => {
  let body = req.body;
  let queryString = `INSERT INTO adventures (date, subject, title, description, completed) VALUES($1::VARCHAR(10), $2::VARCHAR(40), $3::VARCHAR(60), $4::TEXT, $5::BOOLEAN)`;
  pool
    .query(queryString, [
      body.date,
      body.subject,
      body.title,
      body.description,
      body.completed,
    ])
    .then((response) => {
      res.json(body);
    });
});

routes.put("/adventures/:id", (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let queryString = `UPDATE adventures SET date=$1::VARCHAR(10), subject=$2::VARCHAR(40), title=$3::VARCHAR(60), description=$4::TEXT, completed=$5::BOOLEAN WHERE id=${id}`;
  pool
    .query(queryString, [
      body.date,
      body.subject,
      body.title,
      body.decription,
      body.completed,
    ])
    .then((response) => {
      res.json(req.body);
    });
});

routes.delete("/adventures/:id", (req, res) => {
  let id = req.params.id;
  let queryString = `DELETE FROM adventures WHERE id=${id}`;
  pool.query(queryString).then((response) => {
    res.sendStatus(204);
  });
});

module.exports = routes;
