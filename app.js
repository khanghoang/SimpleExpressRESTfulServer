require('dotenv').load();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var oauthServer = require('oauth2-server');

var routes = require('./routes');

var app = express();

var mongoose = require('mongoose');

var uristring = 'mongodb://localhost/memcard';

// Makes connection asynchronously. Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// OAUTH
app.oauth = oauthServer({
  model: require('./oauth/models'),
  grants: ['password'],
  debug: true
})

app.all('/oauth/token', app.oauth.grant())
app.use(app.oauth.errorHandler())

var domain = require('domain');
var defaultHandler = require('errorhandler');

app.use(function(error,req,res,next){
    if (domain.active) {
        console.info('caught with domain')
        domain.active.emit("error", error);
    }else{
        console.info('no domain')
        defaultHandler(error, req, res, next);
    }
});

app.get('/', function(req, res, next, collection){
    console.log('Index')
    res.send('please select a collection, e.g /collections/messages')
})

// USERS
app.post('/collections/users', routes.users.connectUser, routes.users.createUser)
app.get('/collections/users', routes.users.connectUser, routes.users.listUsers)
app.get('/collections/users/:userID', routes.users.connectUser, routes.users.getUserByUserID)
app.put('/collections/users/:userID', routes.users.connectUser, routes.users.updateUserByUserID)
app.delete('/collections/users/:userID', routes.users.connectUser, routes.users.deleteUserByUserID)

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var port = process.env.port || 3000

server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)
})

module.exports = app;
