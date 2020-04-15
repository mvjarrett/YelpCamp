var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	dotenv = require('dotenv').config(),
	mongoose = require('mongoose'),
	flash = require('connect-flash'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	methodOverride = require('method-override'),
  User = require('./models/user');

var commentRoutes = require('./routes/comments'),
	campgroundRoutes = require('./routes/campgrounds'),
	userRoutes = require('./routes/users');

mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());

// seed the database, uncomment this to get a sample set
//  of 3 campgrounds with a comment or two each
// seedDB();

app.use(
	require('express-session')({
		secret: process.env.PASSPORT_SECRET_KEY,
		resave: false,
		saveUninitialized: false
	})
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

//server port logic or w/e//

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('Server Has Started on port 3000');
});
