/**
 * Users Class
 */

/**
 * Constructor 
 */
var Users = function() {
	if (arguments.callee._singletonInstance)
		return arguments.callee._singletonInstance;

	arguments.callee._singletonInstance = this;
	this.userlist = [];
};

/**
 * Add new user to userlist 
 *
 * @param {username}
 * @param {idSock}
 */
Users.prototype.addUser = function(username, idSock) {
	this.userlist.push({ username: username, socket_id: idSock });
};

/**
 * Get user by index from userlist 
 *
 * @param {id}
 * @return json object
 */
Users.prototype.getUserByIndex = function(index) {
	return this.userlist[index];
};

/**
 * Get user by socket id from userlist 
 *
 * @param {idSock}
 * @return json object
 */
Users.prototype.getUserBySock = function(idSock) {
	for (var i = this.userlist.length - 1; i >= 0; i--)
		if (this.userlist[i].socket_id === idSock)
			return this.userlist[i];
};

/**
 * Check if user exists in userlist
 *
 * @param {username}
 * @return boolean
 */
Users.prototype.isUserExists = function(username) {
	for (var i = this.userlist.length - 1; i >= 0; i--)
		if (this.userlist[i].username === username)
			return true;

	return false;
};

/**
 * Delete user by id from userlist 
 *
 * @param {id}
 * @return json object
 */
Users.prototype.deleteByndex = function(id) {
	return this.userlist.splice(id, 1); 	
};

/**
 * Delete user by socket id from userlist 
 *
 * @param {idSock}
 * @return json object
 */
Users.prototype.deletebySock = function(idSock) {
	for (var i = this.userlist.length - 1; i >= 0; i--)
		if (this.userlist[i].socket_id === idSock) 
			return this.userlist.splice(i, 1);		
};

/**
 * Delete user by name from userlist 
 *
 * @param {username}
 * @return json object
 */
Users.prototype.deleteByName = function(username) {
	for (var i = this.userlist.length - 1; i >= 0; i--)
		if (this.userlist[i].username === username) 
			return this.userlist.splice(i, 1);			
};

/**
 * Return users count
 *
 * @Return integer
 */
Users.prototype.getUsersCount = function() {
	return this.userlist.length();
};

module.exports = Users;