const express = require('express');
const config = require('config');
const logger = require('../start/logger');

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`server running on port ${port}`));

app.get("/", (req, res) => res.send("From Pastours' node server: \\{^_^}/ hi!"));

require('../start/routes')(app);
require('../start/headers')(app);
require('../start/db')();

if(!config.get('emailPrivateKey' || 'authPrivateKey' || 'dbConnString')) throw new Error('STARTUP ERROR: env variables not defined');

module.exports = app;
