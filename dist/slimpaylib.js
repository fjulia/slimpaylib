'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request');

var Auth = function () {
	function Auth(options) {
		_classCallCheck(this, Auth);

		this.app_name = options.app_name;
		this.app_secret = options.app_secret;
		this.oauth_url = options.oauth_url;
		this.token = {};
		this.renovation_date = 0;
		this.token.expires_in = 0;
	}

	_createClass(Auth, [{
		key: 'getBearer',
		value: function getBearer(next) {
			var _this = this;

			if (!this._is_token_valid()) {
				this._retrieve_token(function (err) {
					if (err) {
						throw new Error('Authentication error');
					} else {
						next(_this.token.access_token);
					}
				});
			} else {
				next(this.token.access_token);
			}
		}
	}, {
		key: '_is_token_valid',
		value: function _is_token_valid() {
			var now = new Date() / 1000;
			return now < this.renovation_date + this.token.expires_in;
		}
	}, {
		key: '_retrieve_token',
		value: function _retrieve_token(callback) {
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
			});
		}
	}]);

	return Auth;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request');
//require('request-debug')(request);

var Client = function () {
	function Client(auth) {
		_classCallCheck(this, Client);

		this.auth = auth;
	}

	_createClass(Client, [{
		key: 'do_get',
		value: function do_get(url, callback) {
			this.auth.getBearer(function (bearer) {
				var options = {
					url: url,
					method: 'GET',
					headers: {
						'Authorization': 'Bearer ' + bearer,
						'Accept': 'application/hal+json',
						'profile': 'https://api.slimpay.net/alps/v1'
					}
				};
				request(options, function (err, res, body) {
					if (err) console.log("do_get error", err);
					callback(err, body);
				});
			});
		}
	}, {
		key: 'do_post',
		value: function do_post(url, object, callback) {
			this.auth.getBearer(function (bearer) {
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
				request(options, function (err, res, body) {
					if (err) console.log("do_get error", err);
					callback(err, body);
				});
			});
		}
	}]);

	return Client;
}();
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request');

var halIndex = function halIndex() {
	_classCallCheck(this, halIndex);

	this.links = {};
	var url = global.sandbox_entrypoint_url;
	if (process.env['NODE_ENV'] === 'production') {
		url = global.entrypoint_url;
	}
};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slimpaylib = function () {
  function Slimpaylib(options) {
    _classCallCheck(this, Slimpaylib);

    if (!options) throw new Error("Missing credentials");
    if (!options.app_name) throw new Error("Missing app_name");
    if (!options.app_secret) throw new Error("Missing app_secret");
    if (!options.creditor_reference) throw new Error("Missing creditor_reference");
    this.auth = new Auth(options);
    this.payment = new PaymentManager(this.auth, options);
  }

  _createClass(Slimpaylib, [{
    key: "test",
    value: function test() {
      var _this = this;

      this.auth.do_auth(function () {
        console.log(_this.auth.token);
      });
    }
  }, {
    key: "sign_mandate",
    value: function sign_mandate(id_user, callback) {
      this.payment.sign_mandate(id_user, callback);
    }
  }]);

  return Slimpaylib;
}();

exports.default = Slimpaylib;
module.exports = exports["default"];
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PaymentManager = function () {
	function PaymentManager(auth, options) {
		_classCallCheck(this, PaymentManager);

		this.options = options;
		this.client = new Client(auth);
	}

	_createClass(PaymentManager, [{
		key: "sign_mandate",
		value: function sign_mandate(id_user, callback) {
			var _this = this;

			var entryUrl = this.options.sandbox_entrypoint_url;
			var creditor = this.options.creditor_reference;
			var subscriber = id_user;
			//Retrieve entry point
			this.client.do_get(entryUrl, function (err, links) {
				var lnk = JSON.parse(links);
				var mandate = _this._createSignMandateRequest(creditor, subscriber);
				_this.client.do_post(lnk._links['https://api.slimpay.net/alps#create-orders'].href, mandate, function (err, body) {
					if (err) console.log("ERROR: Failed post mandate", err);
					console.log(body);
					callback();
				});
			});
			//Create orders
		}
	}, {
		key: "_createSignMandateRequest",
		value: function _createSignMandateRequest(creditor, subscriber) {
			var res = {
				creditor: { reference: creditor },
				subscriber: { reference: subscriber.id_user },
				items: [{
					"autoGenReference": true,
					"type": "signMandate",
					"mandate": {
						"signatory": {
							//						"honorificPrefix": "Mr",
							"familyName": "Doe",
							"givenName": "John",
							//						"telephone": "+33612345678",
							//						"email": "john.doe@gmail.com",
							"billingAddress": {
								"street1": "27 rue des fleurs",
								//							"street2": "Bat 2",
								"postalCode": "75008",
								"city": "Paris",
								"country": "FR"
							}
						}
					}
				}],
				started: true
			};
			return res;
		}
	}]);

	return PaymentManager;
}();