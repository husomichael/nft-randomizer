const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//POST details for randomization.
router.post('/', (req, res) => {
    console.log('random post', req.body);

    

});

module.exports = router;