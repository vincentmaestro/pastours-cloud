const express = require('express');
const auth = require('../middlewares/auth');
const { validateUpdateInput, User } = require('../models/users');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-_id -isAdmin -password -__v');

    if(!user) return res.status(404).send('user not found');

    res.send(user);
});

router.put('/', auth, async (req, res) => {
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

router.delete('/', auth, async (req, res) => {
    const userId = req.user.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if(!deletedUser) return res.status(400).send('user does not exist');

    res.send('user deleted successsfully');
});


module.exports = router;