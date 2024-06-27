const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../models/users'); 

const router = express.Router();

router.get('/:token', async (req, res) => {
    const token = req.params.token;
    const decoded = jwt.verify(token, config.get('emailPrivateKey'));
    
    let user = await User.findOne({ email: decoded.email });
    user.emailVerified = true;
    await user.save();
    
    res.send({ message: 'Email verified successfully' });
});

module.exports = router;