const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const levelSchema = new Schema(
	{
		difficulty: {
			type: String,
			required: true,
			unique: true,
		},
		category: {
			type: String,
			required: true,
			unique: true,
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
