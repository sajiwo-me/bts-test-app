const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true },
	country: { type: String, required: true },
	city: { type: String, required: true },
	name: { type: String, required: true },
	address: { type: String, required: true }
});


const UserModel = mongoose.model('UserModel', Schema);


module.exports = UserModel;