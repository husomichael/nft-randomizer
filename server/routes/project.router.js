const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET projects from database for selected user_id.
router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
    console.log('project post')
    const project = req.body.project
    console.log('req.body:', req.body);
    console.log('req.user:', req.user);
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
router.delete('/:id', (req, res) =>{
    console.log('**** project delete ****');
    const projectToDelete = req.params.id
    console.log('req.params:', req.params);
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
router.get('/select', (req, res) =>{
    console.log('*** project select get ***');
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
router.put('/select/:id', (req, res) => {
    console.log('*** project select PUT ***')
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


module.exports = router;