const Result = require('../models/resultModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

// get all gigs
const getResults = async (req, res) => {
	const user_id = req.user._id;
	console.log('get results');
	// only finds gigs that match user_id
	const results = await Result.find({ user_id });
	// .sort({ createdAt: -1 })
	// .populate({
	// 	path: 'songs',
	// });
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
	// .populate({
	// 	path: 'songs',
	// });
	if (!result) {
		return res.status(404).json({ error: 'No such result' });
	}
	res.status(200).json(result);
};
// const getResult = async (req, res) => {
// 	const { id } = req.params;
// 	console.log('get result');
// 	// check if id exists
// 	if (!mongoose.Types.ObjectId.isValid(id)) {
// 		return res.status(404).json({ error: 'No such result' });
// 	}
// 	const result = await result.findById(id).populate({
// 		path: 'songs',
// 	});
// 	if (!result) {
// 		return res.status(404).json({ error: 'No such result' });
// 	}
// 	res.status(200).json(result);
// };

// create new workout
const createResult = async (req, res) => {
	const { songID } = req.body;
	console.log(songID, 'songID');
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
			correctSongIDs: [songID],
			incorrectSongIDs,
			// songs,
			user_id,
		});
		// gig.support_bands.push()
		res.status(200).json(result);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// delete a workout
const deleteResult = async (req, res) => {
	const { id } = req.params;
	// console.log(id, 'id backend');
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such result' });
	}
	const resultUserId = await Result.findById({ _id: id });
	// console.log(resultUserId, 'resultUserId');
	// console.log(resultUserId.user_id, 'resultUserId');
	const userId = await resultUserId.user_id;
	// console.log(resultUserId[0].user_id, 'resultUserId');
	const result = await Result.findOneAndDelete({ _id: id });
	const user = await User.findByIdAndUpdate(
		{ _id: userId },
		{ $pull: { results: { $in: id } } }
	);
	// console.log(user, 'user updated in result controller?');
	if (!result) {
		return res.status(404).json({ error: 'No such result' });
	}
	res.status(200).json(result);
};

// update a playlist
const updateResult = async (req, res) => {
	const { id } = req.params;
	const { resultData } = req.body;
	// const { songId } = req.body;
	console.log(resultData, 'songId');
	// console.log(songId, 'songId');
	// const favs = { ...req.body };
	// console.log(favs, 'fav');
	console.log(id, 'id');
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such user' });
	}
	const result = await Result.findByIdAndUpdate(
		{ _id: resultData.resultID },
		{ ...req.body, $push: { correctSongIDs: resultData.sID } }
		// second object contains data to update
		// {
		// gets all properties in body
		// ...req.body,
		// favourites: req.body.favourites.push(songId),
		// favourites: ...favourites,songId,
		// ...req.body,
		// first_name: first_name,
		// }
	);
	if (!result) {
		return res.status(404).json({ error: 'No such result' });
	}
	// const result = await result.findByIdAndUpdate(
	// 	{ _id: id },
	// 	{ ...req.body, $push: { songs: songId } }
	// 	// second object contains data to update
	// 	// {
	// 	// gets all properties in body
	// 	// ...req.body,
	// 	// favourites: req.body.favourites.push(songId),
	// 	// favourites: ...favourites,songId,
	// 	// ...req.body,
	// 	// first_name: first_name,
	// 	// }
	// );
	// if (!result) {
	// 	return res.status(404).json({ error: 'No such result' });
	// }
	res.status(200).json(result);
};

module.exports = {
	getResults,
	getResult,
	createResult,
	deleteResult,
	updateResult,
};
