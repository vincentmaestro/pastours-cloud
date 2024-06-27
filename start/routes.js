const express = require('express');
// const cors = require('cors');
const beverages = require('../routes/beverages');
const alcoholics = require('../routes/alcoholics');
const diary = require('../routes/diaryEggsSpreads');
const snacks = require('../routes/snacksAndBaked');
const users = require('../routes/users');
const user = require('../routes/user');
const verifyEmail = require('../routes/verifyEmail');
const auth = require('../routes/auth');
const errors = require('../middlewares/errors');

module.exports = function(app) {
    app.use(express.json());
    // app.use(cors({ origin: '*' }));

    app.use('/api/users', users);
    app.use('/api/validate', verifyEmail);
    app.use('/api/auth', auth);
    app.use('/api/me', user);
    app.use('/api/beverages', beverages);
    app.use('/api/alcoholics', alcoholics);
    app.use('/api/diary', diary);
    app.use('/api/snacks', snacks);
    
    app.use(errors);
}