const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
	// verify authentication
	const { authorization } = req.headers;

	// check if header exists
	if (!authorization) {
		return res.status(401).json({ error: 'Authorization token required' });
	}

	// get token from header - remove Bearer
	const token = authorization.split(' ')[1];

	try {
		// verify token has not been tampered with
		const { _id } = jwt.verify(token, process.env.SECRET);

		// find user in db - select just returns that field
		req.user = await User.findOne({ _id }).select('_id');
		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({ error: 'Request is not authorized' });
	}
};

module.exports = requireAuth;
