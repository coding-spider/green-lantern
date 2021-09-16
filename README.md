# green-lantern

This is a simple application which follows modern controller services design pattern

## Setup and Installation Guide
- Clone the repo
- Install the dependencies using `npm install` in the project root folder
- Start the server `npm run start`

## To Run the test cases
- `npm run test`

## App Structure
- server.js - Boot file
- config/db-config.json - Maintains all the DB Config
- controllers/case-study-ctrl.js - All Case Study specific routes are defined here
- services/case-study-service.js - All Case Study specific Business Logic resides here
- specs/case-study-service.test.js - Test Cases for Case Study Service

## API Details

Filter Data api is used to filter records based on dates and count params.

```shell
POST  api/case-study/filter-data
```

### Request Body
Field | Data Type | M/O | Description
---------- | ------- | ------- | -------
`startDate` | string | O | Start Date
`endDate` | string | O | End Date
`minCount` | number | M | Min Count
`maxCount` | number | M | Max Count

### Response Data
Field | Data Type | Description
---------- | ------- | -------
`code` | number | Success Code 0 - Success, 1 - Error 
`msg` | string | Success Message/Error Message
`records` | array | Array containing filtered records(Please refer to Sample Response)

*Sample Request*

```
curl --location --request POST 'http://localhost:3000/api/case-study/filter-data' \
--header 'Content-Type: application/json' \
--data-raw '{
    "startDate": "2015-01-28",
    "endDate": "2017-01-29",
    "minCount": 10,
    "maxCount": 100000
}'
```

*Sample Response*

```
{
    "code": 0,
    "msg": "Success",
    "records": [
        {
            "key": "TAKwGc6Jr4i8Z487",
            "createdAt": "2017-01-28T01:22:14.398Z",
            "totalCount": 310
        },
        {
            "key": "TAKwGc6Jr4i8Z487",
            "createdAt": "2017-01-28T01:22:14.398Z",
            "totalCount": 170
        },
        {
            "key": "TAKwGc6Jr4i8Z487",
            "createdAt": "2017-01-28T01:22:14.398Z",
            "totalCount": 120
        }
    ]
}
```
