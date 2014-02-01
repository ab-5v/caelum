require('newrelic');

var fs = require('fs');
var http = require('http');
var path = require('path');
var pzero = require('pzero');
var express = require('express');
var passport = require('passport');

var db = require('./lib/db');
var auth = require('./routes/auth');
var timers = require('./routes/timers');
var jsonResponse = require('./lib/response');

var app = express();

// all environments
app.set('port', process.env.PORT || '/tmp/tq6.ru.sock');

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.cookieSession({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(jsonResponse);

app.get('/api/auth/facebook', auth.facebook);
app.get('/api/auth/facebook/callback', auth.facebookCallback);

app.get(    '/api/timers/',     auth, timers.read);
app.get(    '/api/timers/:_id', auth, timers.read);
app.put(    '/api/timers/:_id', auth, timers.update);
app.del(    '/api/timers/:_id', auth, timers.remove);
app.post(   '/api/timers/',     auth, timers.create);

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

        console.log('Express server listening on', app.get('port'));
    });
}
