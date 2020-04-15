var mongoose = require('mongoose');
const Campground = require('../models/campground');

exports.newCampground = function(req, res) {
	res.render('campgrounds/new');
};

exports.createCampground = function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = { name: name, image: image, description: desc, author: author };
	Campground.create(newCampground, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	});
};

exports.showCampgrounds = function(req, res) {
	//GET ALL CG FROM DB
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/index', { campgrounds: allCampgrounds, currentUser: req.user });
		}
	});
};

exports.showCampground = function(req, res) {
	//FIND CAMPGROUND WITH PROVIDED ID
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
		if (err || !foundCampground) {
			req.flash('error', 'Campground not found.');
			res.redirect('back');
		} else {
			res.render('campgrounds/show', { campground: foundCampground });
		}
	});
};

exports.editCampground = function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		res.render('campgrounds/edit', { campground: foundCampground });
	});
};

exports.updateCampground = function(req, res) {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
		if (err) {
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
	//redirect somewhere (show page)
};

exports.destroyCampground = function(req, res) {
	Campground.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			res.redirect('/campgrounds');
		} else {
			req.flash('success', 'Campground Deleted!');
			return res.redirect('/campgrounds');
		}
	});
};