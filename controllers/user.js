const mongoose = require('mongoose'),
      User = require('../models/user');

exports.showLanding = (req, res) => {
	res.render('landing');
}

exports.signUp = (req, res) => {
	res.render('register');
}

exports.register = (req, res) => {
	var newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('login');
		}
		passport.authenticate('local')(req, res, function() {
			req.flash('success', 'Successfully Signed Up! Nice to meet you ' + req.body.username + '.');
			return res.redirect('/campgrounds');
		});
	});
}

exports.login = (req, res) => {
	var newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('login');
		}
		passport.authenticate('local')(req, res, function() {
			req.flash('success', 'Successfully Signed Up! Nice to meet you ' + req.body.username + '.');
			return res.redirect('/campgrounds');
		});
	});
}

exports.logout = (req, res) => {
	req.logout();
	req.flash('success', 'Logged you out!');
	res.redirect('/campgrounds');
}