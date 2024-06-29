const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(path.resolve("./"),"config/");
const config = require('config');
const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = function() {
    const db = config.get('dbConnString');
    mongoose.connect(db, { useUnifiedTopology: true })
    .then(() => logger.info(`connected to ${db}`));
}