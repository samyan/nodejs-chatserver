 /*
 * module dependencies
 */

var users = require('../modules/users');

/* Authentification */
exports.login = function(req, res) {
	// userlist {singleton class}
	var userlist = new users();

	switch (req.method) {
		case 'GET':
			if (req.session.username) 
				res.render('chat', { username: req.session.username });
			else
				res.render('index');

			break;

		case 'POST':
			req.session.username = req.body.username;
					
			if (req.session.username)
				// check if user exists
				if (userlist.isUserExists(req.session.username) === false)
					res.render('chat', { username: req.session.username });
				else
					res.render('index');
	}
};