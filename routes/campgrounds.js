var express = require('express');
var router = express.Router();
var checkAuth = require('../middleware/check-auth');
var CampgroundController = require('../controllers/campground');

//create
router.post('/', checkAuth.isLoggedIn, CampgroundController.createCampground);
router.get('/new', checkAuth.isLoggedIn, CampgroundController.newCampground);

//read
router.get('/', CampgroundController.readCampgrounds);
router.get('/:id', CampgroundController.readCampground);

//update
router.get('/:id/edit', [checkAuth.isLoggedIn, checkAuth.checkCampOwner], CampgroundController.editCampground);
router.put('/:id', [checkAuth.isLoggedIn, checkAuth.checkCampOwner], CampgroundController.updateCampground);

//delete
router.delete('/:id', [checkAuth.isLoggedIn, checkAuth.checkCampOwner], CampgroundController.deleteCampground);

module.exports = router;
