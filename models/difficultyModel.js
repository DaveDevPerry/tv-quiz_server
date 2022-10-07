const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const difficultySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		timeInMS: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Difficulty', difficultySchema);
