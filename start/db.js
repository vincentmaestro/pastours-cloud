const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(path.resolve("./"),"config/");
const config = require('config');
const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = function() {
    mongoose.connect(config.get('dbConnString'))
    .then(() => logger.info('connected to mongoDB'));
}