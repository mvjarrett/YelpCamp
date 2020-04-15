var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var checkAuth = require('../middleware/check-auth');
var CampgroundController = require('../controllers/campground');

//create
router.post('/', checkAuth.isLoggedIn, CampgroundController.createCampground);
router.get('/new', checkAuth.isLoggedIn, CampgroundController.newCampground);

//read
router.get('/', CampgroundController.showCampgrounds);
router.get('/:id', CampgroundController.showCampground);

//update
router.get('/:id/edit', checkAuth.checkCampOwner, CampgroundController.editCampground);
router.put('/:id', checkAuth.checkCampOwner, CampgroundController.updateCampground);

//delete
router.delete('/:id', checkAuth.checkCampOwner, CampgroundController.destroyCampground);

module.exports = router;
