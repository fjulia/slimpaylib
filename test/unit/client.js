import Auth from '../../src/auth.js';
import Client from '../../src/client.js';
var request = require('request');

describe('Client', () => {
	var options = {
		app_name: 'democreditor01',
		app_secret: 'demosecret01',
		oauth_url: 'http://localhost:5000'
	}
	var bearer = '899a8019-328d-41bb-876a-980f1c768453';
	var auth;
	var authStub;
	beforeEach(() => {
		auth = new Auth(options);
		authStub = sinon.stub(auth, 'getBearer');
		authStub.yeldsOn(auth, bearer);
	});

	afterEach(function () {
		authStub.restore();
	});
	describe('do_get function', () => {
		if ('should success getfor url', () => {
			var client = new Client(auth);
			var callback = sinon.spy();
			var vget = sinon.stub(request, 'post');
			var entryJSON = {
				'_links': {
					'self': {
						'href': 'https://api-sandbox.slimpay.net/'
					},
					'https://api.slimpay.net/alps#post-token': {
						'href': 'https://api-sandbox.slimpay.net/oauth/token'
					},
					'https://api.slimpay.net/alps#create-orders': {
						'href': 'https://api-sandbox.slimpay.net/orders'
					},
					'https://api.slimpay.net/alps#create-direct-debits': {
						'href': 'https://api-sandbox.slimpay.net/direct-debits'
					},
					'https://api.slimpay.net/alps#search-direct-debits': {
						'href': 'https://api-sandbox.slimpay.net/direct-debits{?creditorReference,entityReference,subscriberReference,mandateReference,paymentReference,executionDateBefore,executionDateAfter,page,size}',
						'templated': true
					},
					'profile': {
						'href': 'https://api-sandbox.slimpay.net/alps/v1'
					}
				}
			}
			vget.yieldsOn(client, null, null, entryJSON);
			client.do_get('https://localhost',callback)
			vget.restore();
			sinon.assert.calledWith(callback, null,entryJSON);
		});

	});
	describe('do_post function', () => {

		if ('should success post', () => {
			var client = new Client(auth);
		});
	})
});