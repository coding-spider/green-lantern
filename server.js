'use strict';

const express = require('express');
const app = express();

const port = 3005;
const APP_NAME = 'Green Lantern'

app.use(express.json());

// Routes
app.use("/api/case-study", require("./controllers/case-study-ctrl.js"));

app.listen(port, () => {
  console.log(`${APP_NAME} listening at http://localhost:${port}`)
})