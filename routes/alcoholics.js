const express = require('express');
const { validateNewProduct, getItems } = require('../models/alcoholics');

const router = express.Router();

router.get('/', async (req, res) => {
    const alcoholics = await getItems();
    res.send(alcoholics);
});


module.exports = router;