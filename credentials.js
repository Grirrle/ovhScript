var stdio = require('stdio');
var ops = stdio.getopt({
    'endpoint': {key: 'e', args: 1, description:'enpoint (ex:ovh-eu)'},
    'key': {key: 'k', args: 1, description:'api public key'},
    'secret': {key: 's', args: 1, description:'api secret key'}
});

if (ops.endpoint && ops.key && ops.secret) {
  var ovh = require('ovh')({
    endpoint: ops.endpoint,
    appKey: ops.key,
    appSecret: ops.secret
  });

  ovh.request('POST', '/auth/credential', {
    'accessRules': [
      { 'method': 'GET', 'path': '/*'},
      { 'method': 'POST', 'path': '/*'},
      { 'method': 'PUT', 'path': '/*'},
      { 'method': 'DELETE', 'path': '/*'}
    ]
  }, function (error, credential) {
    console.log(error || credential);
    if(error) {
      console.log(error, credential);
    }
    else {
      console.log("credential : " + credential);
    }

  });
} else {
    ops.printHelp()
}
