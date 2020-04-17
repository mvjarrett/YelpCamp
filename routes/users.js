var express = require('express');
var router = express.Router();
var passport = require('passport');
var { signup, register, login, logout } = require('../controllers/user');

router.get('/register', signup);
router.post('/register', register);

router.get('/login', login);
router.post('/login', passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true,
		successFlash: 'Welcome to YelpCamp!'
	}), (req, res) => {}
);

router.get('/logout', logout);

module.exports = router;
