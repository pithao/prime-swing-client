const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET
router.get('/', async (req, res) => {
    try {
      console.log('GET /api/eventsurvey');
      const queryString = `SELECT * FROM event_survey ORDER BY id DESC;`;
      const results = await pool.query(queryString);
      res.json(results.rows);
    } catch (err) {
      console.error("Error fetching surveys:", err);
      res.sendStatus(400);
    }
  });

//POST

//DELETE


//UPDATE

module.exports = router;