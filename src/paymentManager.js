
class PaymentManager {
	constructor(auth, options) {
		this.options = options;
		this.client = new Client(auth);
	}

	sign_mandate(id_user, callback) {
		var entryUrl = this.options.sandbox_entrypoint_url;
		var creditor = this.options.creditor_reference;
		var subscriber = id_user;
		//Retrieve entry point
		this.client.do_get(entryUrl, (err, links) => {
			var lnk = JSON.parse(links);
			var mandate = this._createSignMandateRequest(creditor, subscriber)
			this.client.do_post(lnk._links['https://api.slimpay.net/alps#create-orders'].href, mandate, (err, body) => {
				if (err) console.log("ERROR: Failed post mandate", err);
				console.log(body);
				callback();
			})

		});
		//Create orders

	}

	_createSignMandateRequest(creditor, subscriber) {
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
}