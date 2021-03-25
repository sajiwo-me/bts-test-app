const express = require('express');
const bcrypt = require('bcrypt');

// global var
const SALT_ROUND = 10;

// import model
const UserModel = require('../../models/user/user-model');

const {mustContain, genAccessToken} = require('../generalfolder/general-function'); 
const {checkToken} = require('../middleware/authentication');


const router = express.Router();

router
	// user signup
	.post('/signup', async (req, res) => {
		console.log("asdfoasdifpaosdij");
		const dataNeeded = ['username', 'email', 'encrypted_password', 'phone', 'address', 'city', 'country', 'name', 'postcode'];
		const checkDataNeeded = mustContain(req.body?.user, dataNeeded);
		if (checkDataNeeded) {
			bcrypt.hash(req.body.user.encrypted_password, SALT_ROUND)
				.then(async hash => {
					const newUser = new UserModel({
						username: req.body.user.username,
						email: req.body.user.email,
						password: hash,
						phone: req.body.user.phone,
						address: req.body.user.address,
						city: req.body.user.city,
						country: req.body.user.country,
						name: req.body.user.name,
						postcode: req.body.user.postcode
					});

					try{
						await newUser.save();
						const payload = {
								_id: newUser._id,
								email: newUser.email,
								userType: newUser.userType
							};
						const resData = {
							email : newUser.email,
							token : genAccessToken(req.body.user, payload),
							username: newUser.username
						}
						res.status(200).json(resData);
					}catch(err){
						console.log(err);
						if (err.code === 11000) {
							let already;
							for (let i of Object.keys(err.keyValue)) {
								already = `${i} already exist`
							}
							res.status(409).send({message: already});
						} else {
							res.status(500).send(err);
						}
					}

				})
				.catch(err => {
					console.log(err);
					res.status(500).send(err);
				});

		} else {
			res.status(400).send({message: "Bad request"});
		}
	})
	// user signin
	.post('/signin', async (req, res) => {
		const dataNeeded = ['email', 'password'];
		const checkDataNeeded = mustContain(req.body, dataNeeded);
		if (checkDataNeeded) {
			UserModel.findOne({email: req.body.email})
				.then(user => {
					bcrypt.compare(req.body.password, user.password, async (err, result) => {
						if (err) return res.status(500).send(err);
						if (result) {
							const payload = {
								_id: user._id,
								email: user.email,
								userType: user.userType
							};

							const resData = {
								email: user.email,
								token: genAccessToken(payload),
								username: user.username
							}

							res.status(200).json(resData);

						} else {
							res.status(401).send({message: "Unauthorize"})
						}
					});	


					
				})
				.catch(err => {
					console.log(err);
				});



		} else {
			res.status(400).send({message: "Bad request"});
		}
	})
	// get users
	.get('/', checkToken, async (req, res) => {
		UserModel.find()
			.then(users => {
				res.status(200).json(users);
			})
			.catch(err => {
				res.status(500).send(err);
			});
	});






module.exports = router;

