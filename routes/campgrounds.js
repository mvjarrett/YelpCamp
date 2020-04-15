var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var checkAuth = require('../middleware/check-auth');
var CampgroundController = require('../controllers/campground');

//INDEX ROUTE - show all campgrounds
router.get('/', CampgroundController.showCampgrounds);

//CREATE ROUTE - add new campground to db
router.post('/', checkAuth.isLoggedIn, CampgroundController.createCampground);

//NEW ROUTE - show form to create new campgrounds
router.get('/new', checkAuth.isLoggedIn, CampgroundController.newCampground);

//SHOW ROUTE - shows more info about one campground
router.get('/:id', CampgroundController.showCampground);

//EDIT campground route
router.get('/:id/edit', checkAuth.checkCampOwner, CampgroundController.editCampground);
//UPDATE campground route
router.put('/:id', checkAuth.checkCampOwner, CampgroundController.updateCampground);

// DESTROY CAMPGROUND ROUTE

router.delete('/:id', checkAuth.checkCampOwner, CampgroundController.destroyCampground);

module.exports = router;
