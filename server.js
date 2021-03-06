const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');
const withAuth = require('./middleware');
const getCurrentUserData = require('./getCurrentUserData');
require('dotenv').config();

const app = express();

const secret = process.env.SECRET;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const mongo_uri = 'mongodb://localhost/react-online-course';
mongoose.connect(mongo_uri, { useNewUrlParser: true }, function (err) {
	if (err) {
		throw err;
	} else {
		console.log(`Successfully connected to ${mongo_uri}`);
	}
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/home', function (req, res) {
	res.send('Welcome!');
});

app.post('/api/register', function (req, res) {
	const { firstName, lastName, email, password } = req.body;
	const user = new User({ firstName, lastName, email, password });
	user.save(function (err) {
		if (err) {
			console.log(err);
			res.status(500).send('Error registering new user please try again.');
		} else {
			res.status(200).send('Welcome to the club!');
		}
	});
});

app.get('/logout', (req, res) => {
	res.clearCookie('token');
	return res.status(200).redirect('/login');
});

app.post('/api/login', function (req, res) {
	const { email, password } = req.body;
	User.findOne({ email }, function (err, user) {
		if (err) {
			console.error(err);
			res.status(500).json({
				error : 'Internal error please try again'
			});
		} else if (!user) {
			res.status(401).json({
				error : 'Incorrect email or password'
			});
		} else {
			user.isCorrectPassword(password, function (err, same) {
				if (err) {
					res.status(500).json({
						error : 'Internal error please try again'
					});
				} else if (!same) {
					res.status(401).json({
						error : 'Incorrect email or password'
					});
				} else {
					// Issue token
					uid = user.uid;
					const payload = { uid };
					const token = jwt.sign(payload, secret, {
						expiresIn : '1h'
					});

					currentUser = {
						email     : user.email,
						firstName : user.firstName,
						lastName  : user.lastName,
						role      : user.role
					};
					res.cookie('token', token, { httpOnly: false });
					res.send(currentUser);
				}
			});
		}
	});
});

app.post('/checkToken', withAuth, function (req, res) {
	res.sendStatus(200);
});

app.post('/getCurrentUserData', function (req, res) {
	const uid = req.body.uid;
	User.findOne({ uid }, function (err, user) {
		currentUser = {
			email : user.email,
			role  : user.role
		};

		if (user) {
			res.send(currentUser);
		} else {
			res.send('no user');
		}
	});
});

app.listen(process.env.PORT || 8080);
