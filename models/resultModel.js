const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const resultSchema = new Schema(
	{
		correctSongs: {
			type: [
				{
					type: String,
					unique: true,
				},
			],
		},
		// correctSongIDs: {
		// 	type: [
		// 		{
		// 			type: String,
		// 			unique: true,
		// 		},
		// 	],
		// },
		// correctSongIDs:  [
		// 	{
		// 		type: String,
		// 		unique: true,
		// 	},
		// ],
		playedCount: {
			type: Number,
			required: true,
			default: 0,
		},
		correctSongCount: {
			type: Number,
			required: true,
			default: 0,
		},
		songCount: {
			type: Number,
			required: true,
			default: 0,
		},
		user_id: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Result', resultSchema);
