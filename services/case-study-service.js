'use strict'

const moment = require('moment');

const dbUtil = require('../utils/db-util');

let filterData = ({ startDate = new Date(), endDate = new Date(), minCount, maxCount }) => {
    return new Promise((resolve, reject) => {
        const dbName = 'getir-case-study';

        startDate = new Date(moment.utc(startDate).startOf('day').format());
        endDate = new Date(moment.utc(endDate).endOf('day').format());

        if(isNaN(minCount)) {
            return reject(new Error(`Invalid minCount!`))
        }

        if(isNaN(maxCount)) {
            return reject(new Error(`Invalid maxCount!`))
        }
        
        dbUtil.getConnection()
            .then((client) => {
                const db = client.db(dbName);
                return db.collection('records').aggregate([
                    {
                        $match: {
                            createdAt: { $gte: startDate, $lte: endDate }
                        }
                    },
                    {
                        $addFields: {
                            totalCount: { $sum: '$counts'}
                        }
                    },
                    {
                        $match: {
                            totalCount: { $gte: minCount, $lte: maxCount}
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            key: 1,
                            createdAt: 1,
                            totalCount: 1
                        }
                    }
                ]).toArray();
            })
            .then((data) => {
                return resolve(data);
            })
            .catch(reject);

    });
}

module.exports = {
    filterData
}