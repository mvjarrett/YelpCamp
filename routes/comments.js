var express = require('express');
var router = express.Router({ mergeParams: true });
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var checkAuth = require('../middleware/check-auth');

//NEW ROUTE (COMMENTS)
router.get('/new', checkAuth.isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if (err || !campground) {
			req.flash('error', 'Campground not found.');
			res.redirect('back');
		} else {
			res.render('comments/new', { campground: campground });
		}
	});
});

//Comments Create
router.post('/', checkAuth.isLoggedIn, function(req, res) {
	//lookup camp with id
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
			res.redirect('/campgrounds');
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					req.flash('error', 'Something went wrong.');
				} else {
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

//comment edit route
router.get('/:comment_id/edit', [checkAuth.isLoggedIn, checkAuth.checkCommentOwner], function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err || ~foundCampground) {
			req.flash('error', 'No campground found.');
			return res.redirect('back');
		}
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if (err) {
				res.redirect('back');
			} else {
				res.render('comments/edit', { campground_id: req.params.id, comment: foundComment });
			}
		});
	});
});
//comment update route
router.put('/:comment_id', [checkAuth.isLoggedIn, checkAuth.checkCommentOwner], function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
		if (err) {
			res.redirect('back');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

// comment destroy route

router.delete('/:comment_id', [checkAuth.isLoggedIn, checkAuth.checkCommentOwner], function(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function(err) {
		if (err) {
			res.redirect('back');
		} else {
			req.flash('success', 'Comment deleted successfully!');
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

module.exports = router;
