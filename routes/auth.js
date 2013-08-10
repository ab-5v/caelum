var passport = require('passport');

/*
 * GET login.
 */

exports.login = function(req, res){
  res.render('login', { title: 'Express' });
};

/*
 * POST login
 */
exports.doLogin = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
});
