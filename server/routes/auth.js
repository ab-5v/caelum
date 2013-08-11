var passport = require('passport');
var facebook = require('passport-facebook').Strategy;

var options = {
    clientID: 286466648147122,
    clientSecret: '7d006475e55f98439f5faef86f979b7d',
    callbackURL: 'http://tq6.ru/api/auth/facebook/callback'
};

var strategy = new facebook(options, verify);

var redirect = {
    successRedirect: '/',
    failureRedirect: '/login'
};

passport.use('facebook', strategy);

var DB = {};

function verify(accessToken, refreshToken, profile, done) {
    console.log('>>> verify', arguments);

    DB[profile.username] = profile;
    done(null, profile);
   // User.findOrCreate(..., function(err, user) {
   //     if (err) { return done(err); }
   //     done(null, user);
   // });

}

passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    done(null, DB[username]);
});

module.exports = {
    // Redirect the user to Facebook for authentication.  When complete,
    // Facebook will redirect the user back to the application at
    // /auth/facebook/callback
    facebook: passport.authenticate('facebook').bind(passport),

    // Facebook will redirect the user to this URL after approval.  Finish the
    // authentication process by attempting to obtain an access token.  If
    // access was granted, the user will be logged in.  Otherwise,
    // authentication has failed.
    facebookCallback: passport.authenticate('facebook', redirect).bind(passport)
};
