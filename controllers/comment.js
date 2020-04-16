const mongoose = require('mongoose'),
      Campground = require('../models/campground'),
      Comment = require('../models/comment');

exports.newComment = (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if (err || !campground) {
			req.flash('error', 'Campground not found.');
			res.redirect('back');
		} else {
			res.render('comments/new', { campground });
		}
	});
};

exports.createComment = (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log(err);
			res.redirect('/campgrounds');
		} else {
      const author = { id: req.user._id, username: req.user.username },
            text = req.body.comment.text;
      Comment.create({ text, author }, (err, comment) => {
        if (err) {
          req.flash('error', 'Something went wrong.');
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/' + campground._id);
        }
      });
		}
	});
}

exports.editComment = (req, res) => {
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
}

exports.updateComment = (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
		if (err) {
			res.redirect('back');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
}

exports.deleteComment = (req, res) => {
	Comment.findByIdAndRemove(req.params.comment_id, (err) => {
		if (err) {
			res.redirect('back');
		} else {
			req.flash('success', 'Comment deleted successfully!');
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
}