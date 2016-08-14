var Sp = require('./dist/slimpaylib.js')
var options = require('./config/secret');

var slim =  new Sp(options);
var subscriber = {
    id_user : "subscriber01",
    givenName: "Cognom",
    familyName: "",
    billingAddress:{
        street1:"",
        postalCode: "",
        city: "",
        country: ""
    }

}
slim.sign_mandate(subscriber,()=>{});