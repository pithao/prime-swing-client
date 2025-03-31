const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET
router.get('/', async (req, res) => {
    try {
      console.log('GET /api/danceformdata');
      const queryString = `SELECT * FROM dance_survey ORDER BY id DESC;`;
      const results = await pool.query(queryString);
      res.json(results.rows);
    } catch (err) {
      console.error("Error fetching dance data", err);
      res.sendStatus(400);
    }
  });

//POST
router.post('/', (req, res)=>{
  console.log('/api/danceformdata', req.body, req.query)
  const {
    anonymous, name, email, contactPermission, dancerRole, age, gender, zipCode,
    danceFeedback, danceImprovement, lessonComments, djComments, generalComments,
    danceRatings
  } = req.body;

  
  const {
    satisfaction, instructor, lessonSatisfaction, recommendationLikelihood,
    djSatisfaction, locationSatisfaction, scheduleSatisfaction
  } = danceRatings;

  const queryText = `
    INSERT INTO "dance_survey" (
      anonymous, name, email, contact_permission, dancer_role, age, gender, zip_code, 
      satisfaction, instructor_rating, lesson_satisfaction, recommendation_likelihood, 
      dj_satisfaction, location_satisfaction, schedule_satisfaction, 
      dance_feedback, dance_improvement, lesson_comments, dj_comments, general_comments
    ) 
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, 
      $9, $10, $11, $12, $13, $14, $15, 
      $16, $17, $18, $19, $20
    );
  `;

  const values = [
    anonymous, name, email, contactPermission, dancerRole, age, gender, zipCode,
    satisfaction, instructor, lessonSatisfaction, recommendationLikelihood,
    djSatisfaction, locationSatisfaction, scheduleSatisfaction,
    danceFeedback, danceImprovement, lessonComments, djComments, generalComments
  ];
  pool.query(queryText, values ).then( ( results )=>{
    res.sendStatus(201);
  }).catch( ( err )=>{
    console.log( err );
    res.sendStatus( 400 );
  })
})

//DELETE
router.delete('/:id', (req, res)=>{
  console.log('/danceformdata DELETE', req.params.id );
  const queryString = `DELETE FROM "dance_survey" WHERE id=$1;`;
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