const path = require("path");
process.env['NODE_CONFIG_DIR'] = path.join(path.resolve("./"),"config/");
const express = require('express');
const config = require('config');
const logger = require('../start/logger');

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`server running on port ${port}`));

require('../start/routes')(app);
require('../start/headers')(app);
require('../start/db')();

if(!config.get('emailPrivateKey' || 'authPrivateKey' || 'dbConnString')) throw new Error('STARTUP ERROR: env variables not defined');

module.exports = app;
