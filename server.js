'use strict';

const express = require('express');
const app = express();

const port = 80;
const APP_NAME = 'Green Lantern'

app.use(express.json());

app.get('/', (req, res) => {
  return res.send('Green Lantern is happy to serve!');
})

// Routes
app.use("/api/case-study", require("./controllers/case-study-ctrl.js"));

app.listen(port, () => {
  console.log(`${APP_NAME} listening at http://localhost:${port}`)
})