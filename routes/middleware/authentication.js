const jwt = require('jsonwebtoken');


exports.checkToken = (req, res, next) => {	
	const access_token = req.headers.authorization.split(" ")[1];
	jwt.verify(access_token, process.env.SECRET_ACCESS_TOKEN, (err, decode) => {
		if (err) {
			console.log(err);
			res.status(401).send({message: "Unauthorize"});}
		next();
	});
}