const mongoose = require('mongoose'),
      Campground = require('../models/campground');


exports.newCampground = (req, res) => res.render('campgrounds/new');

exports.createCampground = (req, res) => {
  const campground = { ...req.body, author: req.user._id };

	Campground.create(campground).then(newCampground => {
		res.redirect(`campgrounds/${newCampground._id}`);
	}).catch(err => {
    console.log(err);
  });
};

exports.readCampground = (req, res) => {
	Campground.findById(req.params.id).populate('author').populate({path: 'comments', populate: { path: 'author' }}).then(campground => {
    res.render('campgrounds/show', { campground });
  }).catch(err => {
    req.flash('error', 'Campground not found.');
    res.redirect('back');
  });
};

exports.readCampgrounds = (req, res) => {
  Campground.find().then(campgrounds => {
    res.render('campgrounds/index', { campgrounds, currentUser: req.user });
  }).catch(err => {
    console.log(err);
  });
};

exports.editCampground = (req, res) => {
  Campground.findById(req.params.id).then(campground => {
    res.render('campgrounds/edit', { campground });
  }).catch(err => {
    console.log(err);
  });
}

exports.updateCampground = (req, res) => {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground).then(campground => {
    res.redirect(`/campgrounds/${req.params.id}`);
  }).catch(err => {
		res.redirect('/campgrounds');
	});
};

exports.deleteCampground = (req, res) => {
	Campground.findByIdAndDelete(req.params.id).then(() => {
    req.flash('success', 'Campground Deleted!');
  }).catch(err => {
    req.flash('error', 'Campground not Deleted!');
  }).then(() => {
    res.redirect('/');
  });
}