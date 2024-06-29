const path = require("path");
process.env['NODE_CONFIG_DIR'] = path.join(path.resolve("./"),"config/");
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');

    if(!token) return res.status(401).send('access denied.');

    const decoded = jwt.verify(token, config.get('authPrivateKey'));
    req.user = decoded;

    next();
}