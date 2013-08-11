var passport = require('passport');

module.exports = function(req, res) {
    if (!req.user) {
        res.redirect('/login');
    }
};

/*
 * GET login.
 */

module.exports.login = function(req, res){
  res.render('login', { title: 'Express' });
};

/*
 * POST login
 */
module.exports.doLogin = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
});
