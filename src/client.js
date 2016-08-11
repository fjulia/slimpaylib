var request = require('request');

export default class Client {
	constructor(auth) {
		this.auth = auth;
	}

	do_get(url,callback) {
		var options = {
			url: url,
			method: 'GET',
			headers: {
				'Authorization': 'Bearer '+this.auth.token.access_token,
				'Accept': 'application/hal+json',
				'profile': 'https://api.slimpay.net/alps/v1'
			}
		};
		request(options, (err,res,body)=>{
			if(err)console.log("do_get error",err);
			callback(err,body);
		});

	}

	do_post(url,object,callback) {
		var options = {
			url: url,
			method: 'POST',
			headers: {
				'Authorization': 'Bearer '+this.auth.token.access_token,
				'Accept': 'application/hal+json',
				'profile': 'https://api.slimpay.net/alps/v1'
			},
			form: object
		};
		request(options, (err,res,body)=>{
			if(err)console.log("do_post error",err);
			callback(err,body);
		});
	}
}