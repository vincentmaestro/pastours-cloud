const path = require("path");
process.env['NODE_CONFIG_DIR'] = path.join(path.resolve("./"),"config/");
require('express-async-errors');
require('winston-mongodb');
const config = require('config');
const { createLogger, transports, format } = require('winston');
const { prettyPrint, simple } = format;
const connectionString = config.get('dbConnString');

const logger = createLogger({
    transports: [
        new transports.Console({ handleExceptions: true, handleRejections: true, format: prettyPrint() }),
        new transports.File({ handleExceptions: true, handleRejections: true, filename: 'logs.log', level: 'error', format: simple() }),
        new transports.MongoDB({ handleExceptions: true, handleRejections: true, db: connectionString, level: 'error', format: simple() })
    ]
});

module.exports = logger;