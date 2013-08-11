var fs = require('fs');
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
app.set('port', process.env.PORT || '/tmp/tq6.ru.sock');
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

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
    .then(listen)
    .fail(function(err) {
        console.log(err);
        process.exit();
    });


function listen() {
    var port = app.get('port');
    var mask = process.umask(0);

    // нужно удалить старый сокет перед запуском
    if (fs.existsSync(port)) {
        fs.unlinkSync(port);
    }

    http.createServer(app).listen(port, function() {
        if (mask) {
            process.umask(mask);
            mask = null;
        }

        console.log('Express server listening on' + app.get('port'));
    });
}
