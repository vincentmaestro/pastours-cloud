const logger = require('../start/logger');

module.exports = function(err, req, res, next) {
    logger.error(err.message, err);

    switch(err.message) {
        case 'jwt expired': return res.status(400).send({ message: 'token expired'});
        case 'invalid token': return res.status(400).send({ message: 'invalid token'});
        case 'jwt malformed': return res.status(400).send({ message: 'invalid token'});
        case 'Unexpected token': return res.status(400).send({ message: 'invalid token'});
        case 'invalid algorithm': return res.status(400).send({ message: 'invalid token'});

        default: res.status(500).send({ message: 'An error occured'});
    }
}