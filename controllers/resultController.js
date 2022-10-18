const Result = require('../models/resultModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

// get all gigs
const getResults = async (req, res) => {
	const user_id = req.user._id;
	console.log('get results');
	// only finds gigs that match user_id
	const results = await Result.find({ user_id });
	res.status(200).json(results);
};

// get a single workout
const getResult = async (req, res) => {
	const { id } = req.params;
	console.log('get result');
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such result' });
	}
	const result = await Result.findById(id);
	if (!result) {
		return res.status(404).json({ error: 'No such result' });
	}
	res.status(200).json(result);
};

// create new workout
const createResult = async (req, res) => {
	console.log('createResult - resultController');
	const { songID } = req.body;
	console.log(songID, 'songID createResult - resultController');
	// const { title, title, reps } = req.body;

	// handles ui error message if not all fields are complete
	// const emptyFields = [];

	// if (!title) {
	// 	emptyFields.push('title');
	// }
	// if (!name) {
	// 	emptyFields.push('name');
	// }
	// if (!albumTitle) {
	// 	emptyFields.push('albumTitle');
	// }
	// if (!fileUrl) {
	// 	emptyFields.push('fileUrl');
	// }
	// if (!artistName) {
	// 	emptyFields.push('artistName');
	// }
	// if (!artworkUrl) {
	// 	emptyFields.push('artworkUrl');
	// }
	// if (emptyFields.length > 0) {
	// 	return res
	// 		.status(400)
	// 		.json({ error: 'Please fill in all the fields', emptyFields });
	// }

	// add doc to db
	try {
		// user._id comes from middleware VITAL FOR gigs SPECIFIC TO A USER
		const user_id = req.user._id;
		const result = await Result.create({
			correctSongs: [],
			playedCount: 0,
			songCount: 0,
			correctSongCount: 0,
			user_id,
		});
		// const result = await Result.create({
		// 	correctSongIDs: [songID],
		// 	incorrectSongIDs: [],
		// 	user_id,
		// });
		res.status(200).json(result);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// delete a workout
const deleteResult = async (req, res) => {
	console.log('deleteResult - resultController');
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such result' });
	}
	const resultUserId = await Result.findById({ _id: id });
	const userId = await resultUserId.user_id;
	const result = await Result.findOneAndDelete({ _id: id });
	const user = await User.findByIdAndUpdate(
		{ _id: userId },
		{ $pull: { results: { $in: id } } }
	);
	if (!result) {
		return res.status(404).json({ error: 'No such result' });
	}
	res.status(200).json(result);
};

// update a playlist
const updateResult = async (req, res) => {
	console.log('updateResult - resultController');
	const { id } = req.params;
	const { resultData } = req.body;
	console.log(resultData, 'resultData in be update Result');
	console.log(id, 'id');
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such results' });
	}
	const result = await Result.findByIdAndUpdate(
		{ _id: id },
		{
			...req.body,
			$inc: {
				songCount: resultData.songCountToAdd,
				playedCount: resultData.playedCountToAdd,
				correctSongCount: resultData.correctSongCountToAdd,
			},
			$addToSet: {
				correctSongs: {
					$each: resultData.correctSongIds,
				},
			},
		}
	);
	if (!result) {
		return res.status(404).json({ error: 'No such result' });
	}
	console.log(result, 'result to return to fe');
	res.status(200).json(result);
};

module.exports = {
	getResults,
	getResult,
	createResult,
	deleteResult,
	updateResult,
};
