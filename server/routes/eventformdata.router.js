const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET
router.get('/', async (req, res) => {
    try {
      console.log('GET /api/eventformdata');
      const queryString = `SELECT * FROM event_survey ORDER BY id DESC;`;
      const results = await pool.query(queryString);
      res.json(results.rows);
    } catch (err) {
      console.error("Error fetching event data", err);
      res.sendStatus(400);
    }
  });

//POST
router.post('/', (req, res)=>{
  console.log('/api/eventformdata', req.body, req.query);
  const {
    anonymous, name, email, contactPermission, dancerRole, age, gender, zipCode,
    eventRatings, eventFeedback, eventImprovement, proComments, danceComments,
    workshopComments, djComments, additionalWorkshops, generalComments,
    dancesAttended, workshopsAttended
  } = req.body;

  const {
    eventSatisfaction, pro, dj, workshop, recommendationLikelihood,
    workshopSatisfaction, locationSatisfaction, scheduleSatisfaction
  } = eventRatings;

  const queryText = `
  INSERT INTO "event_survey" (
    anonymous, name, email, contact_permission, dancer_role, age, gender, zip_code, 
    event_satisfaction, pro_rating, dj_rating, workshop_rating, recommendation_likelihood, 
    workshop_satisfaction, location_satisfaction, schedule_satisfaction, event_feedback, 
    event_improvement, pro_comments, dance_comments, workshop_comments, dj_comments, 
    additional_workshops, general_comments, dances_attended, workshops_attended
  ) 
  VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, 
    $9, $10, $11, $12, $13, 
    $14, $15, $16, $17, 
    $18, $19, $20, $21, $22, 
    $23, $24, $25, $26
  );
`;

const values = [
  anonymous, name, email, contactPermission, dancerRole, age, gender, zipCode,
  eventSatisfaction, pro, dj, workshop, recommendationLikelihood,
  workshopSatisfaction, locationSatisfaction, scheduleSatisfaction,
  eventFeedback, eventImprovement, proComments, danceComments,
  workshopComments, djComments, additionalWorkshops, generalComments,
  dancesAttended, workshopsAttended
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
  console.log('/eventformdata DELETE', req.params.id );
  const queryString = `DELETE FROM "event_survey" WHERE id=$1;`;
  const values = [ req.params.id ]
  pool.query( queryString, values).then( ( results )=>{
    res.sendStatus( 200 );
  }).catch( ( err )=>{
    console.log( err );
    res.sendStatus( 400 );
  })
})

//PUT

module.exports = router;