const express = require('express');
const bcrypt = require('bcrypt');


// import model
const ShoppingModel = require('../../models/shopping/shopping-model');

const {mustContain, genAccessToken} = require('../generalfolder/general-function'); 
const {checkToken} = require('../middleware/authentication');


const router = express.Router();




router
	// get shopping by id
	.get('/:shoppingId', async (req, res) => {
		const {shoppingId} = req.params;
		if (shoppingId) {
			ShoppingModel.findOne({_id: shoppingId})
				.then(shopping => {
					res.status(200).json(shopping);
				})
				.catch(err => {
					res.status(500).send(err);
				});

		} else {
			res.status(400).send({message: "Bad request"});
		}
	})
	// get all shopping
	.get('/', checkToken ,async (req, res) => {
		ShoppingModel.find()
			.then(shopping => {
				res.status(200).json(shopping);
			})
			.catch(err => {
				res.status(500).send(err);
			});
	})
	// create new shopping
	.post('/', async (req, res) => {
		const {createddate, name} = req.body.shopping;
		const newShopping = new ShoppingModel({
			Name: name,
			CreatedDate: createddate
		});

		try{
			await newShopping.save();
			const resData = {
				createddate: newShopping.CreatedDate,
				id: newShopping._id,
				name: newShopping.Name
			};

			res.status(200).json(resData);

		}catch(err){
			res.status(500).send(err);
		}
	});


module.exports = router;