var db = require('../lib/db');

var xtnd = require('xtnd');
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
    failureRedirect: '/'
};

passport.use('facebook', strategy);

passport.serializeUser(function(profile, done) {
    done(null, profile.provider + '_' + profile.id);
});

passport.deserializeUser(function(key, done) {
    key = key.split('_');
    db.users.findOne({id: key[1], provider: key[0]}, done);
});


module.exports = function(req, res, next) {
    if (req.user) { next(); } else { res.send(403); }
};

xtnd(module.exports, {
    // Redirect the user to Facebook for authentication.  When complete,
    // Facebook will redirect the user back to the application at
    // /auth/facebook/callback
    facebook: passport.authenticate('facebook'),

    // Facebook will redirect the user to this URL after approval.  Finish the
    // authentication process by attempting to obtain an access token.  If
    // access was granted, the user will be logged in.  Otherwise,
    // authentication has failed.
    facebookCallback: passport.authenticate('facebook', redirect)
});


function verify(accessToken, refreshToken, profile, done) {

    var doc = xtnd.filter(profile, filter);
    var sort = [['id', 1]];
    var query = {id: profile.id, provider: profile.provider};
    var options = {upsert: true, new: true};

    db.users.findAndModify(query, sort, doc, options, done);

    function filter(value, key) {
        return key[0] !== '_';
    }
}
