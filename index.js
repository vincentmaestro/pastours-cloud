const express = require('express');
const config = require('config');

const app = express();

const port = process.env.PORT || 3000;
app.listen(port);


require('./start/logger');
require('./start/routes')(app);
require('./start/headers')(app);
require('./start/db')();


if(!config.get('emailPrivateKey' || 'authPrivateKey')) throw new Error('STARTUP ERROR: jwt keys not defined');