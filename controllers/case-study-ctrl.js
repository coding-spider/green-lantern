'use strict';

const express = require("express");
const router = express.Router();

let filterData = (req, res) => {
    return res.json({ success: true, msg: `Loading from controller` })
}

router
    .route("/filter-data")
    .post(filterData);

module.exports = router;