const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET
router.get('/', async (req, res) => {
    try {
      console.log('GET /api/classformdata');
      const queryString = `SELECT * FROM class_survey ORDER BY id DESC;`;
      const results = await pool.query(queryString);
      res.json(results.rows);
    } catch (err) {
      console.error("Error fetching class data", err);
      res.sendStatus(400);
    }
  });

//POST

//DELETE
router.delete('/:id', (req, res)=>{
  console.log('/classformdata DELETE', req.params.id );
  const queryString = `DELETE FROM "class_survey" WHERE id=$1;`;
  const values = [ req.params.id ]
  pool.query( queryString, values).then( ( results )=>{
    res.sendStatus( 200 );
  }).catch( ( err )=>{
    console.log( err );
    res.sendStatus( 400 );
  })
})

//UPDATE

module.exports = router;