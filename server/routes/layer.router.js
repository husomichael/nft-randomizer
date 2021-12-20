const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Get layers from database
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
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('layer post')
    const queryText = `
    INSERT INTO "layers" ("name", "project_id")
    VALUES ($1, $2);
    `;
    const queryValues = [
        req.body,
        //project id goes here
    ];
    pool.query(queryText, queryValues)
    // .then(dbRes =>)
});

module.exports = router;