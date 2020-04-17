var express = require('express');
var router = express.Router();
var checkAuth = require('../middleware/check-auth');
var CampgroundController = require('../controllers/campground');

//create
router.get('/new', checkAuth.isLoggedIn, CampgroundController.newCampground);
router.post('/', checkAuth.isLoggedIn, CampgroundController.createCampground);

//read
router.get('/', CampgroundController.readCampgrounds);
router.get('/:id', CampgroundController.readCampground);

//update
router.get('/:id/edit', [checkAuth.isLoggedIn, checkAuth.isCampOwner], CampgroundController.editCampground);
router.put('/:id', [checkAuth.isLoggedIn, checkAuth.isCampOwner], CampgroundController.updateCampground);

//delete
router.delete('/:id', [checkAuth.isLoggedIn, checkAuth.isCampOwner], CampgroundController.deleteCampground);

module.exports = router;
