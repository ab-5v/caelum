var DB = {
    'artjock': '123'
};

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
        var err = null;
        var pass = DB[username];

        if (err) { return done(err); }

        if (!pass) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (pass == password) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    }
));


module.exports = passport;
