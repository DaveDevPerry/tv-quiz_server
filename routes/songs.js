const express = require('express');
const {
	getSongs,
	getSong,
	createSong,
} = require('../controllers/songController');
// const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// this fires the middleware function to ensure all workout routes require authentication
// router.use(requireAuth);

// /api/workouts/

// GET all workouts
router.get('/', getSongs);

// GET a single workout
router.get('/:id', getSong);

// POST a new workout
router.post('/', createSong);
// DELETE a workout
// router.delete('/:id', deleteGig);
// UPDATE a new workout
// router.patch('/:id', updateGig);

module.exports = router;
