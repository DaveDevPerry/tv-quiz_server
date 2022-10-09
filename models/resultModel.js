const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const resultSchema = new Schema(
	{
		correctSongIDs: [
			{
				type: String,
				unique: true,
			},
		],
		incorrectSongIDs: [
			{
				type: String,
				unique: true,
			},
		],
		user_id: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Result', resultSchema);
