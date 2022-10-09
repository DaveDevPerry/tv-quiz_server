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

router.patch('/:id', updateUser);
// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

module.exports = router;
