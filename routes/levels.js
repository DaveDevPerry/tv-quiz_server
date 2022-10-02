const express = require('express');
const {
	getLevels,
	getLevel,
	createLevel,
} = require('../controllers/levelController');
// const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// this fires the middleware function to ensure all workout routes require authentication
// router.use(requireAuth);

// /api/workouts/

// GET all workouts
router.get('/', getLevels);

// GET a single workout
router.get('/:id', getLevel);

// POST a new workout
router.post('/', createLevel);
// DELETE a workout
// router.delete('/:id', deleteGig);
// UPDATE a new workout
// router.patch('/:id', updateGig);

module.exports = router;
