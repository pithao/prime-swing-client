const express = require('express');
const router = express.Router(); // <- This line initializes the router
const pool = require('../modules/pool'); // Importing from pool
// const { rejectUnauthenticated } = require('../middleware/authMiddleware'); 
const userStrategy = require('../strategies/user.strategy');



  router.get('/', ( req, res)=>{
    console.log('GET /api/eventsurvey');
    // res.send('meow')
    const queryString = `SELECT * FROM "event_survey"`;
    pool.query( queryString ).then( ( results )=>{
        res.send(results.rows );
  }).catch( (err )=>{
    console.log(err );
    res.send( 400 );
  })
 });


module.exports = router;