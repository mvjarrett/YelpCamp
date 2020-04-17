//ALL THE MIDDLEWARE GOES HERE.
var Campground = require('../models/campground');
var Comment = require('../models/comment');

var checkAuth = {};

checkAuth.checkCampOwner = (req, res, next) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err || !foundCampground) {
      req.flash('error', 'Campground not found.');
      res.redirect('back');
    } else {
      if (foundCampground.author.equals(req.user._id)) {
        next();
      } else {
        req.flash('error', 'You do not have permission to do that.');
        res.redirect('back');
      }
    }
  });
};

checkAuth.checkCommentOwner = (req, res, next) => {
	Comment.findById(req.params.comment_id, (err, foundComment) => {
    if (err || !foundComment) {
      req.flash('error', 'Comment not found.');
      res.redirect('back');
    } else {
      if (foundComment.author.equals(req.user._id)) {
        next();
      } else {
        req.flash('error', 'You do not have permission to do that.');
        res.redirect('back');
      }
    }
  });
};

checkAuth.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error', 'You need to be logged in to do that!');
	res.redirect('/login');
};

module.exports = checkAuth;
