const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET layers from database for selected user_id.
router.get('/', (req, res) => {
    const queryText= `
        SELECT * FROM "layers"
        WHERE "user_id"=$1
    `;
    pool.query(queryText, [req.user.id])
    .then(dbRes =>{
        res.send(dbRes.rows);
    })
    .catch(dbErr =>{
        console.log('ERROR: get layers', dbErr);
        res.sendStatus(500);
    });
});

//POST layer to database.
router.post('/', (req, res) => {
    console.log('layer post', req.body)
    const layer = req.body.layer
    console.log('req.body:', req.body);
    console.log('req.user:', req.user);
    const queryText = `
    INSERT INTO "layers" ("layer_name", "project_id", "user_id")
    VALUES ($1, $2, $3);
    `;
    const queryValues = [
        req.body.layer,
        req.body.project,
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