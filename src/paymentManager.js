
class PaymentManager{
	constructor(auth,options){
		this.options = options;
		this.client = new Client(auth);
	}
	
	sign_mandate(creditor, subscriber,callback){
		var entryUrl = this.options.sandbox_entrypoint_url;
		//Retrieve entry point
		this.client.do_get(entryUrl,(err,links)=>{
			var lnk = JSON.parse(links);
			var mandate = _createSignMandateRequest(creditor, subscriber)
			this.client.do_post(lnk.order['https://api.slimpay.net/alps#create-orders'],()=>{
				callback();
			})
			
		});
		//Create orders
		
	}

	_createSignMandateRequest(creditor, subscriber){
		var res = {
			creditor: { reference: creditor},
			subscriber: { reference: subscriber},
			items:[{
    			"autoGenReference": true,
    			"type": "signMandate"
			}],
			started: true
		};
		return res;
	}
}