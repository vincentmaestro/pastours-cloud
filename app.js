const express = require('express');
const config = require('config');

const app = express();

app.get("/", (req, res) => res.send("From Pastours' node server: \{^_^}/ hi!"));

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`server running on port ${port}`));


const logger = require('./start/logger');
require('./start/routes')(app);
require('./start/headers')(app);
require('./start/db')();

if(!config.get('emailPrivateKey' || 'authPrivateKey' || 'dbConnString')) throw new Error('STARTUP ERROR: env variables not defined');