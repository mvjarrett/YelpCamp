var express = require('express');
var router = express.Router();
var passport = require('passport');
var UserController = require('../controllers/user');

router.get('/', UserController.showLanding);

router.get('/register', UserController.signup);
router.post('/register', UserController.register);

router.get('/login', UserController.login);
router.post('/login', passport.authenticate('local', {
		successRedirect: '/campgrounds',
		failureRedirect: '/login',
		failureFlash: true,
		successFlash: 'Welcome to YelpCamp!'
	}), (req, res) => {}
);

router.get('/logout', UserController.logout);

module.exports = router;
