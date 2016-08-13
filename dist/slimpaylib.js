'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
				this.token = body;
				this.renovation_date = new Date() / 1000;
				callback(err);
			});
		}
	}]);

	return Auth;
}();

exports.default = Auth;
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request');

var Client = function () {
	function Client(auth) {
		_classCallCheck(this, Client);

		this.auth = auth;
	}

	_createClass(Client, [{
		key: 'do_get',
		value: function do_get(url, callback) {
			var options = {
				url: url,
				method: 'GET',
				headers: {
					'Authorization': 'Bearer ' + this.auth.token.access_token,
					'Accept': 'application/hal+json',
					'profile': 'https://api.slimpay.net/alps/v1'
				}
			};
			request(options, function (err, res, body) {
				if (err) console.log("do_get error", err);
				callback(err, body);
			});
		}
	}, {
		key: 'do_post',
		value: function do_post(url, object, callback) {
			var options = {
				url: url,
				method: 'POST',
				headers: {
					'Authorization': 'Bearer ' + this.auth.token.access_token,
					'Accept': 'application/hal+json',
					'profile': 'https://api.slimpay.net/alps/v1'
				},
				form: object
			};
			request(options, function (err, res, body) {
				if (err) console.log("do_post error", err);
				callback(err, body);
			});
		}
	}]);

	return Client;
}();

exports.default = Client;
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

exports.default = halIndex;
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
    value: function sign_mandate() {
      this.payment.sign_mandate();
    }
  }]);

  return Slimpaylib;
}();

exports.default = Slimpaylib;
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
		value: function sign_mandate(callback) {
			var entryUrl = this.options.sandbox_entrypoint_url;
			//Retrieve entry point
			this.client.do_get(entryUrl, function (links) {
				console.log(links);
				callback();
			});
			//Create orders
		}
	}]);

	return PaymentManager;
}();

exports.default = PaymentManager;