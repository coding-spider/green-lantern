'use strict'

const dbUtil = require('../utils/db-util');

let filterData = ({ startDate, endDate, minCount, maxCount }) => {
    return new Promise((resolve, reject) => {
        const dbName = 'getir-case-study'
        return resolve([{ key: 'No Records' }]);
    });
}

module.exports = {
    filterData
}