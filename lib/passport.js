var DB = {
    'artjock': '123'
};

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use('local', new LocalStrategy(
    function(username, password, done) {

        var err = null;
        var user = {login: 'artjock', password: '123'};
        var pass = DB[username];

        if (err) { return done(err); }

        if (!pass) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (pass != password) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.login);
});

passport.deserializeUser(function(login, done) {
    done(null, DB[login]);
});

module.exports = passport;
