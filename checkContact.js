var stdio = require('stdio');
var ops = stdio.getopt({
    'endpoint': {key: 'e', args: 1, description:'enpoint (ex:ovh-eu)'},
    'key': {key: 'k', args: 1, description:'api public key'},
    'secret': {key: 's', args: 1, description:'api secret key'},
    'consumerKey': {key: 'c', args: 1, description:'api consommer key'}
});

var async = require('async');
var telephony = require('./lib/telephony');
var dedicatedServer = require('./lib/dedicatedServer');
var xdsl = require('./lib/xdsl');

if (ops.endpoint && ops.key && ops.secret && ops.consumerKey) {
  var ovh = require('ovh')({
    endpoint: ops.endpoint,
    appKey: ops.key,
    appSecret: ops.secret,
    consumerKey: ops.consumerKey
  });

  console.log("Start check contact");

  async.waterfall([
    function(callback) {dedicatedServer.info(callback, ovh);},
    function(callback) {telephony.info(callback, ovh);},
    function(callback) {xdsl.info(callback, ovh);},
    ], function (value) {
      if(value!=null) console.log(value);
    }
  );
} else {
    ops.printHelp()
}
