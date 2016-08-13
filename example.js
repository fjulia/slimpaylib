var Sp = require('./dist/slimpaylib.js')
var options = require('./config/secret');

var slim =  new Sp(options);
slim.sign_mandate();