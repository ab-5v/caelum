var http = require('http');
var path = require('path');
var pzero = require('pzero');
var express = require('express');
var passport = require('./lib/passport');

var db = require('./lib/db');
var routes = require('./routes');
var user = require('./routes/user');
var auth = require('./routes/auth');



var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(express.methodOverride());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/login', auth.login);
app.post('/login', auth.doLogin);
app.get('/users', passport.authorize('local', { failureRedirect: '/login' }), user.list);

pzero
    .when([db.isReady])
    .then(function() {
        http.createServer(app).listen(app.get('port'), function(){
            console.log('Express server listening on port ' + app.get('port'));
        });
    })
    .fail(function(err) {
        console.log(err);
        process.exit();
    });
