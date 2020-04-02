const jwt = require('jsonwebtoken');
const User = require('./models/User');
require('dotenv').config();
const secret = process.env.SECRET;

const withAuth = function (req, res, next) {
	const token = req.cookies.token;
	const roles = req.body.roles;
	if (!token) {
		res.status(401).send({ message: 'Unauthorized: No token provided' });
	} else {
		jwt.verify(token, secret, function (err, decoded) {
			if (err) {
				//delete cookie if cookie is not verified!
				res.clearCookie('token');
				res.send(401).send({ message: 'Unauthorized: Invalid token' });
			} else {
				//check if user has needed rights to access site
				User.findOne({ uid }, function (err, user) {
					let canAccess = false;
					for (role of roles) {
						if (user.role === role) {
							canAccess = true;
						}
					}
					if (canAccess) {
						next();
					} else {
						res.status(403).send({ message: 'Unauthorized: No token provided' });
					}
				});
				req.email = decoded.email;
			}
		});
	}
};

module.exports = withAuth;
