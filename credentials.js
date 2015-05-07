var ovh = require('ovh')({
  endpoint: 'ovh-eu',
  appKey: 'votre appKey',
  appSecret: 'votre appSecret'
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
