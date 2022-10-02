const Level = require('../models/levelModel');
const mongoose = require('mongoose');

// get all gigs
const getLevels = async (req, res) => {
	// const user_id = req.user._id;

	// only finds gigs that match user_id
	const levels = await Level.find({})
		.sort({ createdAt: -1 })
		.populate({ path: 'songs' });
	res.status(200).json(levels);
};
// const getLevels = async (req, res) => {
// 	const user_id = req.user._id;

// 	// only finds gigs that match user_id
// 	const songs = await Song.find({ user_id }).sort({ createdAt: -1 });
// 	res.status(200).json(songs);
// };

// get a single workout
const getLevel = async (req, res) => {
	const { id } = req.params;
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such level' });
	}
	const level = await Level.findById(id);
	if (!level) {
		return res.status(404).json({ error: 'No such level' });
	}
	res.status(200).json(level);
};

// create new workout
const createLevel = async (req, res) => {
	const { difficulty, category } = req.body;

	// handles ui error message if not all fields are complete
	const emptyFields = [];

	if (!difficulty) {
		emptyFields.push('difficulty');
	}
	if (!category) {
		emptyFields.push('category');
	}
	if (emptyFields.length > 0) {
		return res
			.status(400)
			.json({ error: 'Please fill in all the fields', emptyFields });
	}

	// add doc to db
	try {
		// user._id comes from middleware VITAL FOR gigs SPECIFIC TO A USER
		// const user_id = req.user._id;
		const level = await Level.create({
			difficulty,
			category,
			songs: [],
		});
		// gig.support_bands.push()
		res.status(200).json(level);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// delete a workout
// const deleteGig = async (req, res) => {
// 	const { id } = req.params;
// 	// check if id exists
// 	if (!mongoose.Types.ObjectId.isValid(id)) {
// 		return res.status(404).json({ error: 'No such gig' });
// 	}
// 	const gig = await Gig.findOneAndDelete({ _id: id });
// 	if (!gig) {
// 		return res.status(404).json({ error: 'No such gig' });
// 	}
// 	res.status(200).json(gig);
// };

// update a gig
// const updateGig = async (req, res) => {
// 	const { id } = req.params;
// 	// check if id exists
// 	if (!mongoose.Types.ObjectId.isValid(id)) {
// 		return res.status(404).json({ error: 'No such gig' });
// 	}
// 	const gig = await Gig.findByIdAndUpdate(
// 		{ _id: id },
// 		// second object contains data to update
// 		{
// 			// gets all properties in body
// 			...req.body,
// 		}
// 	);
// 	if (!gig) {
// 		return res.status(404).json({ error: 'No such gig' });
// 	}
// 	res.status(200).json(gig);
// };

module.exports = {
	getLevels,
	getLevel,
	createLevel,
	// deleteGig,
	// updateGig,
};
