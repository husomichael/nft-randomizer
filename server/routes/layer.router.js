const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Get layers from database.
router.get('/', (req, res) => {
    const queryText= `
        SELECT * FROM "layers"
    `;
    pool.query(queryText)
    .then(dbRes =>{
        res.send(dbRes.rows);
    })
    .catch(dbErr =>{
        console.log('ERROR: get layers', dbErr);
        res.sendStatus(500);
    });
});

/**
 * POST layer to database.
 */
router.post('/', (req, res) => {
    console.log('layer post')
    const layer = req.body.layer
    console.log('req.body:', req.body);
    console.log('req.user:', req.user);
    const queryText = `
    INSERT INTO "layers" ("layer_name", "project_id")
    VALUES ($1, $2);
    `;
    const queryValues = [
        req.body.layer,
        req.user.id
    ];
    pool.query(queryText, queryValues)
        .then((dbRes) =>{
            res.sendStatus(201);
        })
        .catch((dbErr) =>{
            console.log('/layers POST err:', dbErr);
            res.sendStatus(500);
        });
});

module.exports = router;