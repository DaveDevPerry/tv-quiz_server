const express = require('express');
const {
	getResults,
	getResult,
	createResult,
	deleteResult,
	updateResult,
} = require('../controllers/resultController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// this fires the middleware function to ensure all workout routes require authentication
router.use(requireAuth);

// /api/workouts/

// GET all workouts
router.get('/', getResults);

// GET a single workout
router.get('/:id', getResult);

// POST a new workout
router.post('/', createResult);
// DELETE a workout
router.delete('/:id', deleteResult);
// UPDATE a new workout
// router.put('/:id', updateResult);
router.patch('/:id', updateResult);

module.exports = router;
