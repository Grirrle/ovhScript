var ovh = require('ovh')({
  endpoint: 'ovh-eu',
  appKey: 'votre appKey',
  appSecret: 'votre appSecret',
  consumerKey: 'votre consumerKey'    
});

var async = require('async');

function deleteBlock(server, ipBlock, callback) {
  ovh.request('DELETE', '/dedicated/server/'+server+'/features/backupFTP/access/'+encodeURIComponent(ipBlock), function (err, result) {
    if(err) {
      console.log(err, result);
      callback(err);
    }
    else {
      console.log("Delete "+ipBlock+" result: "+result.comment);
      callback(null);
    }
  });
}

function createBlock(server, ipBlockVal, callback) {
  ovh.request('POST', '/dedicated/server/'+server+'/features/backupFTP/access', {
     cifs: false,
     ftp: false,
     ipBlock: ipBlockVal,
     nfs: true
   }, function (err, result) {
    if(err) {
      console.log(err, result);
      callback(err);
    }
    else {
      console.log("Create "+ipBlockVal+" result: "+result.comment);
      callback(null);
    }
  });
}

function reloadAccessBlock(server, ipBlock) {
  console.log(server+' : '+ipBlock);
  async.waterfall([
    function(callback) {deleteBlock(server, ipBlock, callback)},
    function(callback) {createBlock(server, ipBlock, callback)},
    ], function (value) {
      if(value!=null) console.log(value);
    }
  );
}


function reloadAccess(server) {
  ovh.request('GET', '/dedicated/server/'+server+'/features/backupFTP/access', function (err, ipBlocks) {
    if(err) {
      console.log(err, servers);
    }
    else {
      ipBlocks.forEach(function (ipBlock) {
        reloadAccessBlock(server, ipBlock)
      });
    }
  });
}

ovh.request('GET', '/dedicated/server', function (err, servers) {
  if(err) {
    console.log(err, servers);
  }
  else {
    servers.forEach(reloadAccess);
  }
});
