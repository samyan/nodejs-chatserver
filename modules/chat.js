/**
 * Chat Class
 */

// module dependencies
var io = require('socket.io'); 
var users = require('../modules/users');
var utilities = require('../modules/utilities');

/**
 * Constructor 
 *
 * @param {server}
 * @param {userlist}
 */
var Chat = function(server) {
	this.server = server;
}

/* Init */
Chat.prototype.init = function() {
	// socket instance
 	var sock = io.listen(this.server, '0.0.0.0');
 	var userlist = new users();
 	var util = new utilities();

	// callback on new connection
	sock.sockets.on('connection', function(socket) {

		// callback on first message
		socket.on('connect', function(data) {
			// adding to userlist
			userlist.addUser(data.username, socket.id);
			// emit new connection message
			sock.sockets.emit('new_user', { username: data.username, users: userlist });
		});

		// callback on message receive 
		socket.on('message', function(data) {
			// get user by socket id
			var user = userlist.getUserBySock(socket.id);

			if (user) {
				// emit message
				sock.sockets.emit('new_message', { username: user.username, message: util.escapeHtml(data.message) });
			}
		});

		// callback on client disconnection
		socket.on('disconnect', function(data) {
			// delete user by socket id
			var user = userlist.deletebySock(socket.id);

			if (user)
				// emit disconnect message
				sock.sockets.emit('disconnect_user', { username: user[0].username });
		});
	});
};

module.exports = Chat;