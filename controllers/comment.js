const mongoose = require('mongoose'),
      Campground = require('../models/campground'),
      Comment = require('../models/comment');

exports.newComment = (req, res) => {
	Campground.findById(req.params.id).then(campground => {
    res.render('comments/new', { campground });
  }).catch(err => {
		req.flash('error', 'Campground not found.');
		res.redirect('back');
	});
};

exports.createComment = (req, res) => {
	Campground.findById(req.params.id).then(campground => {
    Comment.create({ text: req.body.comment.text, author: req.user.id }).then(comment => {
      campground.comments.push(comment);
      campground.save();
      res.redirect(`/campgrounds/${campground._id}`);
    });
	}).catch(err => {
    res.redirect('/campgrounds');
  });
}

exports.editComment = (req, res) => {
	Campground.findById(req.params.id).then(campground => {
    Comment.findById(req.params.comment_id).then(comment => {
      res.render('comments/edit', { campground_id: campground._id, comment });
    })
  }).catch(err => {
    req.flash('error', 'Something went wrong.');
    return res.redirect('back');
  });
}

exports.updateComment = (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment).then(comment => {
    res.redirect(`/campgrounds/${req.params.id}`);
  }).catch(err => {
		res.redirect('back');
	});
}

exports.deleteComment = (req, res) => {
	Comment.findByIdAndDelete(req.params.comment_id).then(comment => {
    req.flash('success', 'Comment deleted successfully!');
			res.redirect(`/campgrounds/${req.params.id}`);
  }).catch(err => {
		res.redirect('back');
	});
}