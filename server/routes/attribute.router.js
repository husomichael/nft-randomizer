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
    INSERT INTO "attributes" ("attribute_name", "rarity_value", "layer_id", "user_id", "project_id")
    VALUES ($1, $2, $3, $4, $5);
    `;
    const queryValues = [
        req.body.attribute,
        req.body.rarity,
        req.body.layer,
        req.user.id,
        req.body.project
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

//DELETE attribute from database.
router.delete('/:id', (req, res) =>{
    console.log('**** attribute delete ****');
    const attributeToDelete = req.params.id
    console.log('req.params:', req.params);
    const queryText = `
        DELETE FROM "attributes"
        WHERE "id"=$1;
    `;
    pool.query(queryText, [attributeToDelete])
        .then((dbRes) =>{
            res.sendStatus(200);
        })
        .catch((dbErr) =>{
            res.sendStatus(500);
            console.log('/projects DELETE err:', dbErr);
        });
});

module.exports = router;