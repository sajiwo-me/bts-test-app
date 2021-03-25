const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	Name: { type: String, required: true },
	CreatedDate: { type: String, required: true }
});


const ShoppingModel = mongoose.model('ShoppingModel', Schema);


module.exports = ShoppingModel;