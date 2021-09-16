'use strict'

const dbUtil = require('../utils/db-util');
const { filterData } = require('../services/case-study-service');

// Closing Db Connection after the tests are over
afterAll(async () => {
    await dbUtil.closeConnection();
});

describe('Case Study Service Spec', () => {

    test('Should return valid output', async () => {

        const startDate = new Date();
        const endDate = new Date();
        const minCount = 1;
        const maxCount = 1000;

        const result = await filterData({startDate, endDate, minCount, maxCount})
        expect(Array.isArray(result)).toBe(true);

    })

    test('Should take default fromDate/toDate', async () => {

        const minCount = 1;
        const maxCount = 1000;

        const result = await filterData({minCount, maxCount})
        expect(Array.isArray(result)).toBe(true);

    })

    test('Should throw an error of minCount/maxCount is missing', async () => {

        const startDate = new Date();
        const endDate = new Date();
        const minCount = 10;
        const maxCount = 1000;

        let result;
        
        try {
            result = await filterData({startDate, endDate, maxCount})
        } catch(e) {
            expect(e instanceof Error).toBe(true);
            expect(e.message).toBe('Invalid minCount!');
        }

        try {
            result = await filterData({startDate, endDate, minCount})
        } catch(e) {
            expect(e instanceof Error).toBe(true);
            expect(e.message).toBe('Invalid maxCount!');
        }
        
    })

    // Date Matching
    test('Should Return Document Within between 2017-01-28 and 2017-01-29', async () => {

        const startDate = new Date('2017-01-28');
        const endDate = new Date('2017-01-29');
        const minCount = 1;
        const maxCount = 10000;

        let result = await filterData({startDate, endDate, minCount, maxCount});

        expect(Array.isArray(result)).toBe(true);
        let isValid = result.every((item) => {
            return new Date(item.createdAt).getTime() >= startDate.getTime() && new Date(item.createdAt).getTime() <= endDate.getTime();
        });
        expect(isValid).toBe(true);        
    })


    // Match the count to be between the passed value
    test('Should Return Document with totalCount between 10 and 1000', async () => {

        const startDate = new Date('2017-01-28');
        const endDate = new Date('2017-01-29');
        const minCount = 10;
        const maxCount = 1000;

        let result = await filterData({startDate, endDate, minCount, maxCount});

        expect(Array.isArray(result)).toBe(true);
        let isValid = result.every((item) => {
            return item.totalCount >= minCount && item.totalCount <= maxCount;
        });
        expect(isValid).toBe(true);        
    })

})