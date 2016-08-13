
export default class PaymentManager{
	constructor(auth,options){
		this.options = options;
		this.client = new Client(auth);
	}
	
	sign_mandate(callback){
		var entryUrl = this.options.sandbox_entrypoint_url;
		//Retrieve entry point
		this.client.do_get(entryUrl,(links)=>{
			console.log(links);
			callback();
		});
		//Create orders
		
	}
}