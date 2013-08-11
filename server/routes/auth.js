var passport = require('passport');

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
