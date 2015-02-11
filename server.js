var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');

var app = express();
var port = 8834;

app.use(session({
	secret: 'asdflkaww$3434343%slk%lskalsa6s51as848as83z32s21df4as5s35sdf'
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
	clientID: '1638933316328500',
	clientSecret: '8b87d18d97bd53ef39bbb324438cb21f',
	callbackURL: 'http://localhost:8834/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
	return done(null, profile);
}));

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

/*var isAuthed = function(req, res, next) {
	if (!req.isAuthenticated()) {
		res.redirect('/login');
	}
	next();
}*/

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	successRedirect: '/me',
	failureRedirect: '/login'
}))

app.get('/me', function(req, res) {
	res.status(200).json(req.user);
})

app.listen(port);