const jwt = require ('jsonwebtoken');

exports.mustContain = function (container, ...args) {
	if (typeof(container) === 'object') {
		if (args.length > 0 ) {
			let value;
			let params;

			Array.isArray(args[0]) ? params = args[0] : params = args;

			const objectKeys = Object.keys(container);
			for (let i=0; i<params.length; i++) {
				if (objectKeys.includes(params[i])) {
					value = {
						value: true
					}
				} else {
					value = {
						value: false,
						message: `${params[i]} is required`
					};
					break;
				}
			}
			return value;

		} else {
			throw new Error('Required two arguments, now is include one');
		}

	} else {
		throw new Error(`First argument must an object, now is a ${typeof(container)} `)
	}
}



exports.genAccessToken = function (payload) {
	const secret = process.env.SECRET_ACCESS_TOKEN;
	const options = {
		expiresIn: process.env.ACCESS_TOKEN_LIFE
	};
	const token = jwt.sign(payload, secret, options);
	return token
}
