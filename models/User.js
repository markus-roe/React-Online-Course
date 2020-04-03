const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const generateUID = () => {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
	firstName : { type: String, required: true },
	lastName  : { type: String, required: true },
	email     : { type: String, required: true, unique: true },
	password  : { type: String, required: true },
	role      : { type: String, required: false },
	uid       : { type: String, required: false }
});

UserSchema.pre('save', function (next) {
	console.log(this);
	if (this.isNew || this.isModified('password')) {
		const document = this;
		bcrypt.hash(this.password, saltRounds, function (err, hashedPassword) {
			if (err) {
				next(err);
			} else {
				document.password = hashedPassword;
				document.role = 'user';
				document.uid = generateUID();
				next();
			}
		});
	} else {
		next();
	}
});

UserSchema.methods.isCorrectPassword = function (password, callback) {
	bcrypt.compare(password, this.password, function (err, same) {
		if (err) {
			callback(err);
		} else {
			callback(err, same);
		}
	});
};

module.exports = mongoose.model('User', UserSchema);
