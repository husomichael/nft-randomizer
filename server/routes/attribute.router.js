const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET attributes from database for selected user_id.
router.get('/', (req, res) => {
    const queryText= `
        SELECT * FROM "attributes"
        WHERE "user_id"=$1
    `;
    pool.query(queryText, [req.user.id])
    .then(dbRes =>{
        res.send(dbRes.rows);
    })
    .catch(dbErr =>{
        console.log('ERROR: get attributes', dbErr);
        res.sendStatus(500);
    });
});

//POST attribute to database
router.post('/', (req, res) => {
    console.log('attribute post:', req.body);
    const queryText = `
    INSERT INTO "attributes" ("attribute_name", "rarity_value", "layer_id", "user_id")
    VALUES ($1, $2, $3, $4);
    `;
    const queryValues = [
        req.body.attribute,
        req.body.rarity,
        req.body.layer,
        req.user.id
    ];
    pool.query(queryText, queryValues)
        .then((dbRes) =>{
            res.sendStatus(201);
        })
        .catch((dbErr) =>{
            console.log('/attributes POST err:', dbErr);
            res.sendStatus(500);
        });
});

module.exports = router;