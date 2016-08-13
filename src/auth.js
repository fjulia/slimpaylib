var request = require('request');

class Auth {
	constructor(options) {
		this.app_name = options.app_name;
		this.app_secret = options.app_secret;
		this.oauth_url = options.oauth_url;
		this.token = {};
		this.renovation_date = 0;
		this.token.expires_in = 0;
	}

	getBearer(next) {
		if (!this._is_token_valid()) {
			this._retrieve_token((err) => {
				if (err) {
					throw new Error('Authentication error');
				} else {
					next(this.token.access_token);
					
				}
			});
		} else {
			next(this.token.access_token);
		}
	}

	_is_token_valid() {
		var now = new Date() / 1000;
		return now < (this.renovation_date + this.token.expires_in);
	}

	_retrieve_token(callback) {
		var self = this;
		request.post(this.oauth_url, {
			form: {
				grant_type: 'client_credentials',
				scope: 'api'
			},
			auth: {
				user: this.app_name,
				pass: this.app_secret
			}
		}, function (err, res, body) {
			self.token = JSON.parse(body);
			self.renovation_date = new Date() / 1000;
			callback(err);
		})
	}
}