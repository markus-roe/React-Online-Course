const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;

const withAuth = function (req, res, next) {
	const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
	if (!token) {
		res.status(401).send({ message: 'Unauthorized: No token provided' });
	} else {
		jwt.verify(token, secret, function (err, decoded) {
			if (err) {
				//delete cookie if cookie is not verified!
				res.clearCookie('token');
				res.send(401).send({ message: 'Unauthorized: Invalid token' });
			} else {
				req.email = decoded.email;
				next();
			}
		});
	}
};

module.exports = withAuth;
