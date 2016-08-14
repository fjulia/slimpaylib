var request = require('request');
//require('request-debug')(request);

class Client {
	constructor(auth) {
		this.auth = auth;
	}


	do_get(url, callback) {
		this.auth.getBearer((bearer) => {
			var options = {
				url: url,
				method: 'GET',
				headers: {
					'Authorization': 'Bearer ' + bearer,
					'Accept': 'application/hal+json',
					'profile': 'https://api.slimpay.net/alps/v1'
				}
			};
			request(options, (err, res, body) => {
				if (err) console.log("do_get error", err);
				callback(err, body);
			});
		})
	}

	do_post(url, object, callback) {
		this.auth.getBearer((bearer) => {
			var options = {
				url: url,
				method: 'POST',
				headers: {
					'Authorization': 'Bearer ' + bearer,
					'Accept': 'application/hal+json',
					'profile': 'https://api.slimpay.net/alps/v1',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(object)
			};
			request(options, (err, res, body) => {
				if (err) console.log("do_get error", err);
				callback(err, body);
			});
		})
	}
}