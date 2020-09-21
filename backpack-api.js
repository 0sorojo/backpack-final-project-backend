"use strict";
const express = require("express");
const routes = express.Router();
const pool = require("./connection");
const { response } = require("express");

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

// This route is used to test and GET all ADVENTURES

routes.get("/adventures", (req, res) => {
  let queryString = `SELECT * FROM adventures`;
  pool.query(queryString).then((response) => {
    res.json(response.rows);
  });
});

// This route is used to GET the ADVENTURES for the current day that have not been COMPLETED

routes.get("/adventures/adventurestogo", (req, res) => {
  let date = new Date();
  let yyyy = date.getFullYear();
  let mm = months[date.getMonth()];
  let dd = date.getDate();
  let constructedDate = `${mm}-${dd}-${yyyy}`;
  let queryString = `SELECT * FROM adventures WHERE completed=false AND date='${constructedDate}'`;
  pool.query(queryString).then((response) => {
    res.json(response.rows);
  });
});

// This route is used to GET a NUMBER of how many of each SUBJECT have been COMPLETED for the current day

routes.get("/adventures/dailycomplete", (req, res) => {
  let date = new Date();
  let yyyy = date.getFullYear();
  let mm = months[date.getMonth()];
  let dd = date.getDate();
  let constructedDate = `${mm}-${dd}-${yyyy}`;
  let queryString = `SELECT date AS "dateDone", 
  COUNT(completed), subject
  FROM adventures WHERE completed=true AND date='${constructedDate}'
  GROUP BY date, subject ORDER BY subject`;
  pool.query(queryString).then((response) => {
    res.json(response.rows);
  });
});

// This route is used to GET a NUMBER of how many total ADVENTURES are INCOMPLETE for the current day

routes.get("/adventures/dailyincomplete", (req, res) => {
  let date = new Date();
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

// this route GETs the ADVENTURES that are INCOMPLETE to date NOT INCLUDING today (Backpack)

routes.get("/adventures/backpack", (req, res) => {
  let date = new Date();
  let yyyy = date.getFullYear();
  let mm = months[date.getMonth()];
  let dd = date.getDate();
  let constructedDate = `${mm}-${dd}-${yyyy}`;
  let queryString = `SELECT * FROM adventures WHERE date != '${constructedDate}' AND completed = false
  `;
  pool.query(queryString).then((response) => {
    res.json(response.rows);
  });
});

// This route is used to GET a NUMBER of how many of each SUBJECT has been COMPLETED to date

routes.get("/adventures/complete", (req, res) => {
  let queryString = `SELECT subject AS "subject", 
  COUNT(completed) 
  FROM adventures WHERE completed=true
  GROUP BY subject ORDER BY subject`;
  pool.query(queryString).then((response) => {
    res.json(response.rows);
  });
});

// This route is used to GET a NUMBER of how many total ADVENTURES are INCOMPLETE to date

routes.get("/adventures/incomplete", (req, res) => {
  let queryString = `SELECT COUNT(completed) AS "total" FROM adventures WHERE completed = false`;
  pool.query(queryString).then((response) => {
    res.json(response.rows);
  });
});

// This route is used to create a new ADVENTURE

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

// This route is used to UPDATE the SUBJECT, TITLE, AND DESCRIPTION of an ADVENTURE

routes.put("/adventures/:id", (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let queryString = `UPDATE adventures SET subject=$1::VARCHAR(40), title=$2::VARCHAR(60), description=$3::TEXT WHERE id=${id}`;
  pool
    .query(queryString, [body.subject, body.title, body.description])
    .then((response) => {
      res.json(req.body);
    });
});

// This route is used to UPDATE the COMPLETED value to TRUE on a specific ADVENTURE

routes.put("/adventures/update/:id", (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let queryString = `UPDATE adventures SET completed = true WHERE id = ${id}`;
  pool.query(queryString).then((response) => {
    res.json(body);
  });
});

// This route is used to UPDATE the LOCATION value to START on a specific ADVENTURE

routes.put("/adventures/start/:id", (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let queryString = `UPDATE adventures SET location = 'start' WHERE id = ${id}`;
  pool.query(queryString).then((response) => {
    res.json(body);
  });
});

// This route is used to UPDATE the LOCATION value to DOING on a specific ADVENTURE

routes.put("/adventures/doing/:id", (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let queryString = `UPDATE adventures SET location = 'doing' WHERE id = ${id}`;
  pool.query(queryString).then((response) => {
    res.json(body);
  });
});

// This route is used to UPDATE the LOCATION value to FINISH on a specific ADVENTURE

routes.put("/adventures/finish/:id", (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let queryString = `UPDATE adventures SET location = 'finish' WHERE id = ${id}`;
  pool.query(queryString).then((response) => {
    res.json(body);
  });
});

// This route is used  UPDATE the TIMERCOUNTER

routes.put("/adventures/counter/:id", (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let queryString = `UPDATE adventures SET timercounter=$1::SMALLINT WHERE id=${id}`;
  pool.query(queryString, [body.timercounter]).then((response) => {
    res.json(body);
  });
});

// This route is used to UPDATE the DATE

routes.put("/adventures/update-date/:id", (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let date = new Date();
  let yyyy = date.getFullYear();
  let mm = months[date.getMonth()];
  let dd = date.getDate();
  let constructedDate = `${mm}-${dd}-${yyyy}`;
  let queryString = `UPDATE adventures SET date = '${constructedDate}' WHERE id = ${id}`;
  pool.query(queryString).then((response) => {
    res.json(body);
  });
});

// This route is used to DELETE a specific ADVENTURE

routes.delete("/adventures/:id", (req, res) => {
  let id = req.params.id;
  let queryString = `DELETE FROM adventures WHERE id=${id}`;
  pool.query(queryString).then((response) => {
    res.sendStatus(204);
  });
});

module.exports = routes;
