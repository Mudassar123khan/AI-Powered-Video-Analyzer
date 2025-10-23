const express = require('express');
const router = express.Router();
const { summarizeLocal } = require('../controllers/summarizeLocal');
const { summarizeYtVid } = require('../controllers/summarizeYtVid');

//To summarize locally uploaded video files.
router.post("/local", summarizeLocal);

// To summarize a given youtube video (link).
router.post("/ytvid", summarizeYtVid);

module.exports = router;