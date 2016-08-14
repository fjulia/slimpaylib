# SLIMPAY node library

[![Travis build status](http://img.shields.io/travis/fjulia/slimpaylib.svg?style=flat)](https://travis-ci.org/fjulia/slimpaylib)
[![Dependency Status](https://david-dm.org/fjulia/slimpaylib.svg)](https://david-dm.org/fjulia/slimpaylib)
[![devDependency Status](https://david-dm.org/fjulia/slimpaylib/dev-status.svg)](https://david-dm.org/fjulia/slimpaylib#info=devDependencies)

##Usage

Copy config/secrets.example.js no config/secrets.js and change it accodding your preferences.

Example usage:

```js
var Sp = require('./dist/slimpaylib.js')
var options = require('./config/secret');

var slim =  new Sp(options);
var subscriber = {
    id_user : "subscriber01",
    givenName: "givenName",
    familyName: "familyName",
    billingAddress:{
        street1:" street 11",
        postalCode: " 1111",
        city: "city",
        country: "ES"
    }

}
slim.sign_mandate(subscriber,()=>{});
```