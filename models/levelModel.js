const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const levelSchema = new Schema(
	{
		difficulty: {
			type: String,
			required: true,
			unique: true,
		},
		difficultyTypes: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Difficulty',
					required: false,
				},
			],
		},
		category: {
			type: String,
			required: true,
			unique: true,
		},
		questionCount: {
			type: Number,
			required: true,
			default: 5,
		},
		songs: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Song',
					required: false,
				},
			],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Level', levelSchema);
