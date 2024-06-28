const express = require('express');
const logger = require('./start/logger');

const app = express();

app.get("/", (req, res) => res.send("From Pastours' node server: \{^_^}/ hi!"));

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`server started on port ${port}`));


module.exports = app;