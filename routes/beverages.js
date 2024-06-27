const express = require('express');
const { validateNewProduct, getItems } = require('../models/beverages');

const router = express.Router();

router.get('/', async (req, res) => {
    const beverages = await getItems();
    res.send(beverages);
});


module.exports = router;