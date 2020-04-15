var express = require('express');
var router = express.Router({ mergeParams: true });
var checkAuth = require('../middleware/check-auth');
var CommentController = require('../controllers/comment')

//create
router.get('/new', checkAuth.isLoggedIn, CommentController.newComment);
router.post('/', checkAuth.isLoggedIn, CommentController.createComment);

//update
router.get('/:comment_id/edit', [checkAuth.isLoggedIn, checkAuth.checkCommentOwner], CommentController.editComment);
router.put('/:comment_id', [checkAuth.isLoggedIn, checkAuth.checkCommentOwner], CommentController.updateComment);

//delete
router.delete('/:comment_id', [checkAuth.isLoggedIn, checkAuth.checkCommentOwner], CommentController.deleteComment);

module.exports = router;
