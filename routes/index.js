// GET home page.
exports.index = function(req, res) {
	if (req.session.username)
		res.render('chat', { username: req.session.username });
	else
		res.render('index');
};