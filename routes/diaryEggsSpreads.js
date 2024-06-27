const express = require('express');
const { validateNewProduct, getItems } = require('../models/diaryAndEggs');

const router = express.Router();

router.get('/', async (req, res) => {
    const diaryAndEggs = await getItems();
    res.send(diaryAndEggs);
});


module.exports = router;