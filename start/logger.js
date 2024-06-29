const path = require("path");
process.env['NODE_CONFIG_DIR'] = path.join(path.resolve("./"),"config/");
const config = require('config');
const { createLogger, transports, format } = require('winston');
const { prettyPrint, simple } = format;
require('express-async-errors');
require('winston-mongodb');

const logger = createLogger({
    transports: [
        new transports.Console({ handleExceptions: true, handleRejections: true, format: prettyPrint() }),
        new transports.File({ handleExceptions: true, handleRejections: true, filename: 'logs.log', level: 'error', format: simple() }),
        new transports.MongoDB({ handleExceptions: true, handleRejections: true, db: config.get('dbConnString'), level: 'error', format: simple() })
    ]
});

module.exports = logger;