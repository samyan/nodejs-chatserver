/**
 * ChatServer
 *
 * @author SamYan <luvel88@gmail.com>
 * @copyright 
 * @license GPL v3
 */

/*
 * module dependencies
 */

var express = require('express');
var indexRoute = require('./routes');
var chatRoute = require('./routes/chat');
var chatServer = require('./modules/chat');
var http = require('http');
var path = require('path');

// express App
var app = express();

// all environments
app.set('port', process.env.PORT || 9006);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.session({ secret: 'SECURITYNULL' }));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// router
app.get('/', indexRoute.index);
app.get('/chat', chatRoute.login);
app.post('/chat', chatRoute.login);

// socket http server
var server = http.createServer(app).listen(app.get('port'), function(){
	// chat
	var chat = new chatServer(server);
	chat.init();

	console.log('Listening on port ' + app.get('port'));
});