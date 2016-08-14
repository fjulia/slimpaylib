
export default class Slimpaylib{
  constructor(options){
    if(!options) throw new Error("Missing credentials");
    if(!options.app_name) throw new Error("Missing app_name");
    if(!options.app_secret) throw new Error("Missing app_secret");
    if(!options.creditor_reference) throw new Error("Missing creditor_reference");
    this.auth = new Auth(options);
    this.payment = new PaymentManager(this.auth,options);
  }
  
  test(){
    this.auth.do_auth(()=>{
      console.log(this.auth.token);
    });
  }
   
   sign_mandate(id_user,callback){
     this.payment.sign_mandate(id_user,callback);
   }
}

