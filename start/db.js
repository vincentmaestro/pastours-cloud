process.env["NODE_CONFIG_DIR"] = __dirname + "../config";
const config = require('config');
const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = function() {
    const db = config.get('dbConnString');
    mongoose.connect(db)
    .then(() => logger.info(`connected to ${db}`));
}