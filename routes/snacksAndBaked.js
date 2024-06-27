const express = require('express');
const { validateNewProduct, getItems } = require('../models/snacksAndBaked');

const router = express.Router();

router.get('/', async (req, res) => {
    const snacksAndBaked = await getItems();
    res.send(snacksAndBaked);
});


module.exports = router;