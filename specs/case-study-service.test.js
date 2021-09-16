'use strict'

const dbUtil = require('../utils/db-util');
const { filterData } = require('../services/case-study-service');

// Closing Db Connection after the tests are over
afterAll(async () => {
    await dbUtil.closeConnection();
});

describe('Case Study Service', () => {

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
        const maxCount = 1000;

        let result;
        
        try {
            result = await filterData({startDate, endDate, maxCount})
        } catch(e) {
            expect(e instanceof Error).toBe(true);
            expect(e.message).toBe('Invalid minCount!');
        }
        
    })

})