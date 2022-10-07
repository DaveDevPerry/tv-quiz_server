const Difficulty = require('../models/difficultyModel');
const mongoose = require('mongoose');

// create
const createDifficulty = async (req, res) => {
	const { name, timeInMS } = req.body;

	try {
		const difficulty = await Difficulty.create({
			name,
			timeInMS,
		});

		res.status(200).json(difficulty);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	createDifficulty,
};
