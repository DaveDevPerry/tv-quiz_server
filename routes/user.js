const express = require('express');

// controller functions
const {
	signupUser,
	loginUser,
	getUsers,
	updateUser,
} = require('../controllers/userController');

const router = express.Router();
router.get('/', getUsers);

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

router.patch('/:id', updateUser);

module.exports = router;
