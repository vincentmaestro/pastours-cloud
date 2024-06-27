const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { User } = require('../models/users');
const sendVerificationMail = require('../email/verifyEmail');

const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validateClientInput(req.body);
    if(error) res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Invalid email or password');

    if(!user.emailVerified) {
        const emailVerificationToken = user.generateEmailVerificationToken();
        
        await sendVerificationMail(user.email, user.username, emailVerificationToken);
        return res.send('verification email sent');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send({ username: user.username });
});

function validateClientInput(input) {
    const schema = Joi.object({
        email: Joi.string().email().min(5).max(50).required(),
        password: Joi.string().min(8).max(12).required()
    });

    return schema.validate({
        email: input.email,
        password: input.password
    });
}

module.exports = router;