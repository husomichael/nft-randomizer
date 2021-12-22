const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Get project from database.
router.get('/', (req, res) => {
    const queryText= `
        SELECT * FROM "projects"
    `;
    pool.query(queryText)
    .then(dbRes =>{
        res.send(dbRes.rows);
    })
    .catch(dbErr =>{
        console.log('ERROR: get projects', dbErr);
        res.sendStatus(500);
    });
});

/**
 * POST project to database.
 */
router.post('/', (req, res) => {
    console.log('project post')
    const project = req.body.project
    console.log('req.body:', req.body);
    console.log('req.user:', req.user);
    const queryText = `
    INSERT INTO "projects" ("name", "user_id")
    VALUES ($1, $2);
    `;
    const queryValues = [
        req.body.project,
        req.user.id
    ];
    pool.query(queryText, queryValues)
        .then((dbRes) =>{
            res.sendStatus(201);
        })
        .catch((dbErr) =>{
            console.log('/projects POST err:', dbErr);
            res.sendStatus(500);
        });
});

module.exports = router;