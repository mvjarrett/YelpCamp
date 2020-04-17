var express = require('express');
var router = express.Router();
var { isLoggedIn, isCampOwner } = require('../middleware/check-auth');
var { newCampground, createCampground, editCampground, updateCampground, deleteCampground } = require('../controllers/campground');

//create
router.get('/new', isLoggedIn, newCampground);
router.post('/', isLoggedIn, createCampground);

//read
router.get('/', readCampgrounds);
router.get('/:id', readCampground);

//update
router.get('/:id/edit', [isLoggedIn, isCampOwner], editCampground);
router.put('/:id', [isLoggedIn, isCampOwner], updateCampground);

//delete
router.delete('/:id', [isLoggedIn, isCampOwner], deleteCampground);

module.exports = router;
