require('express-async-errors');
require('winston-mongodb');
const { createLogger, transports, format } = require('winston');
const { prettyPrint, simple } = format;

const logger = createLogger({
    transports: [
        new transports.Console({ handleExceptions: true, handleRejections: true, format: prettyPrint() }),
        new transports.File({ handleExceptions: true, handleRejections: true, filename: 'logs.log', level: 'error', format: simple() }),
        new transports.MongoDB({ handleExceptions: true, handleRejections: true, db: 'mongodb://127.0.0.1/Pastours', level: 'error', format: simple() })
    ]
});

module.exports = logger;