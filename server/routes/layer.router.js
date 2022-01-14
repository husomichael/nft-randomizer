const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//GET layers from database for selected user_id.
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText= `
        SELECT * FROM "layers"
        WHERE "user_id"=$1
    `;
    pool.query(queryText, [req.user.id])
    .then((dbRes) =>{
        res.send(dbRes.rows);
    })
    .catch((dbErr) =>{
        console.log('ERROR: get layers', dbErr);
        res.sendStatus(500);
    });
});

//POST layer to database.
router.post('/', rejectUnauthenticated, (req, res) => {
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

//DELETE layer from database.
router.delete('/:id', rejectUnauthenticated, (req, res) =>{
    console.log('**** layer delete ****');
    const layerToDelete = req.params.id
    console.log('req.params:', req.params);
    const queryText = `
        DELETE FROM "layers"
        WHERE "id"=$1;
    `;
    pool.query(queryText, [layerToDelete])
        .then((dbRes) =>{
            res.sendStatus(200);
        })
        .catch((dbErr) =>{
            res.sendStatus(500);
            console.log('/projects DELETE err:', dbErr);
        });
});

//Get one layer for editing.
router.get('/edit/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        SELECT * FROM "layers"
        WHERE "id" = $1;
    `;
    const sqlValues = [
        req.params.id
    ];
    pool.query(sqlText, sqlValues)
    .then((dbRes) => {
        res.send(dbRes.rows[0]);
    })
    .catch((dbErr) => {
        console.log('SELECT database error', dbErr);
        res.sendStatus(500);
    });
});

//Edit selected layer.
router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        UPDATE "layers" 
        SET "layer_name" = $1
        WHERE "id" = $2;
    `;
    const sqlValues = [
        req.body.layerName,
        req.params.id
    ];
    
    pool.query(sqlText, sqlValues)
    .then((dbRes) => {
        res.sendStatus(200);
    })
    .catch((dbErr) => {
        console.log('UPDATE database error', dbErr);
        res.sendStatus(500);
    });
});

module.exports = router;