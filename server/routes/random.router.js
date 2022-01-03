const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Generate random number between 1 and 100.
function randomInt(){
    return Math.floor(Math.random() * 100) + 1
}

//POST details for randomization.
router.post('/', (req, res) => {
    console.log('random post', req.body);
    for(let i = 0; i<500; i++){
        console.log(randomInt());
    }
});

module.exports = router;