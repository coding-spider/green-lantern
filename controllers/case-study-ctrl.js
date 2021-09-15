'use strict';

const express = require("express");
const router = express.Router();

const caseStudyService = require('../services/case-study-service');

let filterData = (req, res) => {

    const { startDate, endDate, minCount, maxCount } = req.body;

    caseStudyService.filterData({ startDate, endDate, minCount, maxCount })
        .then((data) => {
            let resJSON = { code: 0, msg: 'Success', records: data }
            return res.json(resJSON);
        })
        .catch((err) => {
            const errMsg = err instanceof Error ? err.message : 'Something Went Wrong! Please contact Support';
            let resJSON = { code: 1, msg: errMsg, records: [] }
            return res.json(resJSON);
        });
        
}

router
    .route("/filter-data")
    .post(filterData);

module.exports = router;