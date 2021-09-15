'use strict';

const express = require('express');
const app = express();

const port = 3005;
const APP_NAME = 'Green Lantern'

app.use(express.json());

app.post('/api/filter-data', (req, res) => {
    return res.json({success: true});
});

app.listen(port, () => {
  console.log(`${APP_NAME} listening at http://localhost:${port}`)
})