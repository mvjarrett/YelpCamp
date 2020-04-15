const mongoose = require('mongoose'),
      Campground = require('../models/campground');


exports.newCampground = (req, res) => {
  res.render('campgrounds/new');
};

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
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
		if (err || !foundCampground) {
			req.flash('error', 'Campground not found.');
			res.redirect('back');
		} else {
			res.render('campgrounds/show', { campground: foundCampground });
		}
	});
};

exports.readCampgrounds = (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) { 
      console.log(err); 
    } else { 
      res.render('campgrounds/index', { campgrounds: allCampgrounds, currentUser: req.user }); 
    }
  })
};

exports.editCampground = (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    res.render('campgrounds/edit', { campground: foundCampground });
  });
}

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
			res.redirect('/campgrounds');
		}
	})
};