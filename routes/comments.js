var express = require('express');
var router = express.Router({ mergeParams: true });
var { isLoggedIn, isCommentOwner } = require('../middleware/check-auth');
var {newComment, createComment, editComment, updateComment, deleteComment} = require('../controllers/comment')

//create
router.get('/new', isLoggedIn, newComment);
router.post('/', isLoggedIn, createComment);

//update
router.get('/:comment_id/edit', [isLoggedIn, isCommentOwner], editComment);
router.put('/:comment_id', [isLoggedIn, isCommentOwner], updateComment);

//delete
router.delete('/:comment_id', [isLoggedIn, isCommentOwner], deleteComment);

module.exports = router;
