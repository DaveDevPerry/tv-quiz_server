const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		fileName: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Song', songSchema);
