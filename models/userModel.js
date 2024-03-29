const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Result = require('../models/resultModel');

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		correctSongIDs: {
			type: [
				{
					type: String,
					unique: true,
					required: false,
				},
				// unique: false,
			],
			required: true,
			default: [],
			// index: { unique: true, sparse: true },
		},
		// correctSongIDs: [
		// 	{
		// 		type: String,
		// 		required: false,
		// 		// unique: true,
		// 	},
		// 	// index: { unique: true, sparse: true },
		// ],
		results: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Result',
			required: false,
		},
	},
	{ timestamps: true }
);

// @ note  DON'T USE ARROW FUNCTIONS IF USING "THIS" KEYWORD
// static signup method - call this method on the user model whenever we want to signup a new user
userSchema.statics.signup = async function (email, password, username) {
	console.log('signup in user model');
	// validation
	if (!email || !password || !username) {
		throw Error('All fields must be filled');
	}
	// uses validator to check if valid email
	if (!validator.isEmail(email)) {
		throw Error('Email not valid');
	}
	// uses validator to check if password created is strong enough
	if (!validator.isStrongPassword(password)) {
		throw Error('Password not strong enough');
	}

	// "this" - refers to User
	const exists = await this.findOne({ email });

	if (exists) {
		throw Error('Email already in use');
	}

	// save user
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	// const result = await Result.create({
	// 	correctSongs: [],
	// 	playedCount: 0,
	// 	songCount: 0,
	// 	correctSongCount: 0,
	// 	// user_id: await user._id,
	// });

	// console.log(result, 'result created with user id?');

	const user = await this.create({
		email,
		password: hash,
		username,
		correctSongIDs: [],
		// correctSongIDs: [''],
		// results: await result._id,
	});
	// correctSongIDs,
	// correctSongIDs: [''],
	// correctSongIDs: [''],

	console.log(await user, 'user just created');

	const result = await Result.create({
		correctSongs: [],
		playedCount: 0,
		songCount: 0,
		correctSongCount: 0,
		user_id: await user._id,
	});

	console.log(result, 'result created with user id?');

	user.results = await result._id;

	await user.save();

	return user;
};

// userSchema.pre('update', function (next) {
// 	console.log(this, 'this');
// 	// const modifiedField = this.getUpdate().$set.field;
// 	// if (!modifiedField) {
// 	// 		return next();
// 	// }
// 	try {
// 		// const newFieldValue = // do whatever...
// 		// this.getUpdate().$set.field = newFieldValue;
// 		next();
// 	} catch (error) {
// 		return next(error);
// 	}
// });
// userSchema.pre('save', async function (next) {
// 	// const user = await User.findByIdAndUpdate({_id: this.user_id},
// 	// 	{...user, $push: { playlists: this._id }}
// 	// 	)
// 	console.log(this, 'this in pre save user');
// 	try {
// 		// console.log(User, 'User in pre save');
// 		// console.log(next, 'next in pre save');
// 		console.log(this, 'this in pre save user 1');
// 		// const user = await User.findByIdAndUpdate(
// 		// 	{ _id: this.user_id },
// 		// 	{ $push: { playlists: this._id } }
// 		// 	// { ...user, $push: { playlists: this._id } }
// 		// );

// 		// console.log(user, 'User in pre save');
// 		// console.log(...user, 'User in pre save');
// 		// if (!this.isModified('password')) {
// 		// 	return next();
// 		// }

// 		return next();
// 	} catch (err) {
// 		return next(err);
// 	}
// });

// static login method
userSchema.statics.login = async function (email, password) {
	console.log(email, 'email login');
	// check fields are filled
	if (!email || !password) {
		throw Error('All fields must be filled');
	}
	// "this" - refers to User
	const user = await this.findOne({ email });
	// does user exist
	if (!user) {
		throw Error('incorrect email');
	}
	// password is from body, user.password is the hashed one
	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		throw Error('Incorrect password');
	}

	return user;
};

module.exports = mongoose.model('User', userSchema);
