var express = require('express');
var router = express.Router({ mergeParams: true });
var checkAuth = require('../middleware/check-auth');

router.get('/new', checkAuth.isLoggedIn, CommentController.newComment);
router.post('/', checkAuth.isLoggedIn, CommentController.createComment);
router.get('/:comment_id/edit', [checkAuth.isLoggedIn, checkAuth.checkCommentOwner], CommentController.editComment);
router.put('/:comment_id', [checkAuth.isLoggedIn, checkAuth.checkCommentOwner], CommentController.updateComment);
router.delete('/:comment_id', [checkAuth.isLoggedIn, checkAuth.checkCommentOwner], CommentController.deleteComment);

module.exports = router;
