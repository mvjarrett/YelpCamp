const mongoose = require('mongoose'),
      User = require('../models/user');

exports.showLanding = (req, res) => {
	res.render('../views/users/landing');
}

exports.login = (req, res) => {
  res.render('../views/users/login');
}

exports.signup = (req, res) => {
	res.render('../views/users/register');
}

exports.register = (req, res) => {
	var newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password, (err, user) => {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('../views/users/login');
		}
		passport.authenticate('local')(req, res, () => {
			req.flash('success', 'Successfully Signed Up! Nice to meet you ' + req.body.username + '.');
			return res.redirect('../views/users/campgrounds');
		});
	});
}

exports.logout = (req, res) => {
	req.logout();
	req.flash('success', 'Logged you out!');
	res.redirect('/campgrounds');
}