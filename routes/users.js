const express = require('express');
const bcrypt  = require('bcryptjs');
const { validateClientInput, validateUpdateInput, User } = require('../models/users');
const sendVerificationMail = require('../email/verifyEmail');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

router.get('/', [ auth, isAdmin ] , async (req, res) => {
    const users = await User.find().select('-password -isAdmin -__v');
    res.send(users);
});

router.get('/:id', [ auth, isAdmin ], async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if(!user) return res.status(404).send('user not found');

    res.send(user);
});

router.post('/', async (req, res) => {
    const { error } = validateClientInput(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('user already exists');

    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(req.body.password, salt);

    user =  new User({
        email: req.body.email,
        username: req.body.username,
        password: hashed
    });

    const emailVerificationToken = user.generateEmailVerificationToken();

    await user.save()
        .then(async () => {
            await sendVerificationMail(req.body.email, req.body.username, emailVerificationToken);
            res.send('verification email sent');
        })
});

router.put('/', [ auth, isAdmin ], async (req, res) => {
    const { error } = validateUpdateInput(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const userId = req.user.id;
    const updated = await User.findByIdAndUpdate(userId, {
        username: req.body.username,
        phone: req.body.phone,
        address: req.body.address
    });

    if(!updated) return res.status(400).send('action failed');

    res.send('user updated successfully');
});

router.delete('/', [ auth, isAdmin ], async (req, res) => {
    const userId = req.user.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if(!deletedUser) return res.status(400).send('user does not exist');

    res.send('user deleted successsfully');
});

module.exports = router;