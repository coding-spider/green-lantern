'use strict';

const { MongoClient } = require('mongodb');

const dbConfig = require('../configs/db-config.json')

const client = new MongoClient(dbConfig.uri);

let getConnection = () => {
    return new Promise((resolve, reject) => {

        // if (client.isConnected()) {
        //     console.log(`Returning already connected client`);
        //     return resolve(client);
        // }
        
        client.connect()
            .then(() => {
                return resolve(client);
            })
            .catch((err) => {
                console.error(err);
                return reject(err);
            })
    });
}

module.exports = {
    getConnection
}