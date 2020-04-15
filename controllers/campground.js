const mongoose = require('mongoose'),
      Campground = require('../models/campground');

exports.createCampground = (req, res) => {
	const author = { id: req.user._id, username: req.user.username},
	      newCampground = { ...req.body, author };
	Campground.create(newCampground, (err) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	})
};

exports.readCampground = (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		res.render('campgrounds/edit', { campground });
	})
};

exports.updateCampground = (req, res) => {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err) => {
		if (err) {
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	})
};

exports.deleteCampground = (req, res) => {
	Campground.findByIdAndRemove(req.params.id, (err) => {
		if (err) {
			res.redirect('/campgrounds');
		} else {
			req.flash('success', 'Campground Deleted!');
			return res.redirect('/campgrounds');
		}
	})
};