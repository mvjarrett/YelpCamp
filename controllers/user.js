const mongoose = require('mongoose'),
      User = require('../models/user'),
      passport = require('passport');

exports.login = (req, res) => res.render('../views/users/login');

exports.signup = (req, res) => res.render('../views/users/register');

exports.register = (req, res) => {
	const newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password).then(user => {
    passport.authenticate('local')(req, res, function() {
      req.flash('success', 'Successfully Signed Up! Nice to meet you ' + req.body.username + '.');
      return res.redirect('/');
    });
  }).catch(err => {
		req.flash('error', err.message);
		return res.redirect('/login');
	});
}

exports.logout = (req, res) => {
	req.logout();
	req.flash('success', 'Logged you out!');
	res.redirect('/');
}