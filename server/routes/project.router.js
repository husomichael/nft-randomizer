const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

//GET projects from database for selected user_id.
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText= `
        SELECT * FROM "projects"
        WHERE "user_id"=$1
    `;
    pool.query(queryText, [req.user.id])
    .then(dbRes =>{
        res.send(dbRes.rows);
    })
    .catch(dbErr =>{
        console.log('ERROR: get projects', dbErr);
        res.sendStatus(500);
    });
});

//POST project to database.
router.post('/', rejectUnauthenticated, (req, res) => {
    const queryText = `
    INSERT INTO "projects" ("project_name", "user_id", "is_current")
    VALUES ($1, $2, $3);
    `;
    const queryValues = [
        req.body.project,
        req.user.id,
        'false'
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

//DELETE project from database.
router.delete('/:id', rejectUnauthenticated, (req, res) =>{
    const projectToDelete = req.params.id
    const queryText = `
        DELETE FROM "projects"
        WHERE "id"=$1;
    `;
    pool.query(queryText, [projectToDelete])
    .then((dbRes) =>{
        res.sendStatus(200);
    })
    .catch((dbErr) =>{
        res.sendStatus(500);
        console.log('/projects DELETE err:', dbErr);
    });
});

//GET selected project from database.
router.get('/select', rejectUnauthenticated, (req, res) =>{
    const queryText = `
        SELECT * FROM "projects"
        WHERE "is_current"=$1;
    `;
    pool.query(queryText, ['true'])
    .then((dbRes) =>{
        res.send(dbRes.rows);
    })
    .catch(dbErr =>{
        console.log('ERROR: get projects', dbErr);
        res.sendStatus(500);
    });
});

//PUT selected project to database.
router.put('/select/:id', rejectUnauthenticated, (req, res) => {
    const selectedProject = req.params.id
    //Set all is_current values to false, so only 1 can be true at a time.
    const queryTextRemove = `
    UPDATE "projects"
    SET "is_current"='false'
    WHERE "is_current"='true';
    `;
    pool.query(queryTextRemove, [])
    .then((dbRes) =>{
        const queryTextSelect = `
        UPDATE "projects"
        SET "is_current"='true'
        WHERE "id"=$1;
        `;
        pool.query(queryTextSelect, [selectedProject])
        .then((dbRes) =>{
            res.sendStatus(201);
        }).catch((dbErr) =>{
            console.log('/projects/select PUT select err:', dbErr);
            res.sendStatus(500);
        });
    })
    .catch((dbErr) =>{
        console.log('/projects/select PUT remove err:', dbErr);
        res.sendStatus(500);
    });
});

//Get one project for editing.
router.get('/edit/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        SELECT * FROM "projects"
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

//Edit selected project.
router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        UPDATE "projects" 
        SET "project_name" = $1
        WHERE "id" = $2;
    `;
    const sqlValues = [
        req.body.projectName,
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