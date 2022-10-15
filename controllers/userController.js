const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// mongo uses _id for id property
const createToken = (_id) => {
	// {payload headline_band} , secret, expires 3 days
	// return jwt.sign({ _id }, process.env.SECRET);
	return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// login user
const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		// login() is the static method of user
		const user = await User.login(email, password);
		// create a token
		const token = createToken(user._id);

		const username = user.username;
		// const correctSongIDs = user.correctSongIDs;
		// const favourites = user.favourites;
		// const playlists = user.playlists;
		// const userId = user._id;
		// const defaultAnimation = user.defaultAnimation;
		// const defaultView = user.defaultView;

		console.log(user, 'loginUser backend');
		res.status(200).json({
			email,
			token,
			username,
			// correctSongIDs,
			// favourites,
			// playlists,
			// userId,
			// defaultAnimation,
			// defaultView,
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
	// res.json({ msg: 'login user' });
};

// signup user
const signupUser = async (req, res) => {
	const { email, password, username } = req.body;
	try {
		// signup() is the static method of user
		const user = await User.signup(email, password, username);
		// create a token
		const token = createToken(user._id);

		res.status(200).json({ email, token });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// get users
const getUsers = async (req, res) => {
	const users = await User.find({});
	try {
		res.status(200).json(users);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// // get user
// const getUser = async (req, res) => {
// 	const { id } = req.params;
// 	const user = await User.findById(id);
// 	try {
// 		res.status(200).json({ user });
// 	} catch (error) {
// 		res.status(400).json({ error: error.message });
// 	}
// };

const updateUser = async (req, res) => {
	const { id } = req.params;
	const { correctSongID } = req.body;
	// const { correctResultData } = req.body;
	// const { songID } = req.body;
	// const { questionResult } = req.body;
	// const { musicID } = req.body;
	console.log(correctSongID, 'correctSongID');

	// console.log(correctResultData, 'correctResultData');
	// const favs = { ...req.body };
	// console.log(favs, 'fav');
	console.log(id, 'id');
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such user' });
	}
	const user = await User.findByIdAndUpdate(
		{ _id: id },
		// { ...req.body, $push: { correctSongIDs: correctSongID } }
		// { $addToSet: { correctSongIDs: correctSongID } }
		{ ...req.body, $addToSet: { correctSongIDs: correctSongID } }
	);
	// const user = await User.findByIdAndUpdate(
	// 	{ _id: id },
	// 	{ ...req.body, $push: { correctSongIDs: correctSongID } }
	// );
	if (!user) {
		return res.status(404).json({ error: 'No such user' });
	}
	res.status(200).json(user);
};

// // update a playlist
// const updatePlaylist = async (req, res) => {
// 	const { id } = req.params;
// 	const { plData } = req.body;
// 	// const { songId } = req.body;
// 	console.log(plData, 'songId');
// 	// console.log(songId, 'songId');
// 	// const favs = { ...req.body };
// 	// console.log(favs, 'fav');
// 	console.log(id, 'id');
// 	// check if id exists
// 	if (!mongoose.Types.ObjectId.isValid(id)) {
// 		return res.status(404).json({ error: 'No such user' });
// 	}
// 	const playlist = await Playlist.findByIdAndUpdate(
// 		{ _id: plData.plID },
// 		{ ...req.body, $push: { songs: plData.sID } }
// 		// second object contains data to update
// 		// {
// 		// gets all properties in body
// 		// ...req.body,
// 		// favourites: req.body.favourites.push(songId),
// 		// favourites: ...favourites,songId,
// 		// ...req.body,
// 		// first_name: first_name,
// 		// }
// 	);
// 	if (!playlist) {
// 		return res.status(404).json({ error: 'No such playlist' });
// 	}
// 	// const playlist = await Playlist.findByIdAndUpdate(
// 	// 	{ _id: id },
// 	// 	{ ...req.body, $push: { songs: songId } }
// 	// 	// second object contains data to update
// 	// 	// {
// 	// 	// gets all properties in body
// 	// 	// ...req.body,
// 	// 	// favourites: req.body.favourites.push(songId),
// 	// 	// favourites: ...favourites,songId,
// 	// 	// ...req.body,
// 	// 	// first_name: first_name,
// 	// 	// }
// 	// );
// 	// if (!playlist) {
// 	// 	return res.status(404).json({ error: 'No such playlist' });
// 	// }
// 	res.status(200).json(playlist);
// };

// const updateUser = async (req, res) => {
// 	const { id } = req.params;
// 	const { songId } = req.body;
// 	const favs = { ...req.body };
// 	console.log(favs, 'fav');
// 	console.log(id, 'id');
// 	// check if id exists
// 	if (!mongoose.Types.ObjectId.isValid(id)) {
// 		return res.status(404).json({ error: 'No such user' });
// 	}
// 	const user = await User.findByIdAndUpdate(
// 		{ _id: id },
// 		{ ...req.body, $push: { favourites: songId } },
// 		// second object contains data to update
// 		{
// 			// gets all properties in body
// 			// ...req.body,
// 			// favourites: req.body.favourites.push(songId),
// 			// favourites: ...favourites,songId,
// 			// ...req.body,
// 			// first_name: first_name,
// 		}
// 	);
// 	if (!user) {
// 		return res.status(404).json({ error: 'No such user' });
// 	}
// 	res.status(200).json(user);
// };

module.exports = {
	signupUser,
	loginUser,
	getUsers,
	updateUser,
	// , updateUser, getUsers, getUser
};
