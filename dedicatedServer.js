// dedicatedServer.js
// ========
require('console.table');
var ovh = null;
var infoV =  new Array();
var back = null;

module.exports = {
  info: function (callback, ovhConnect)  {
    ovh = ovhConnect;
    ovh.request('GET', '/dedicated/server', function (err, infoVal) {
      if(err) {
        console.log(err, servers);
        callback(err);
      }
      else {
        showInfos(callback,infoVal);
      }
    });
  },
};

var accountInfo = function( serviceName, i, array) {
  ovh.request('GET', '/dedicated/server/'+ serviceName, function (err, val) {
      if(err) {
        console.log(err, servers);
        callback(err);
      }
      else {
        serviceInfos( serviceName, val.reverse, i, array.length);
      }
    });
}

var nbShowInfo = 0;
var maxShowInfo =0;
var endShowInfo = function() {
  nbShowInfo++;
  if (nbShowInfo === maxShowInfo) {
    console.log("Dedicated Server Info ("+maxShowInfo+")");
    console.table(infoV);

    back(null);
  }
}

var serviceInfos = function( serviceName, desc, i, length) {
  ovh.request('GET', '/dedicated/server/'+ serviceName+'/serviceInfos', function (err, val) {
      if(err) {
        console.log(err, servers);
        back(err);
      }
      else {
        var contact = {
            service :  serviceName,
            description : desc,
            billing: val.contactBilling,
            tech: val.contactTech,
            admin: val.contactAdmin
        };

        infoV.push(contact);
        endShowInfo();        
      }
    });
}

var showInfos = function(callback, infoVal) {
  infoV =  new Array();
  back = callback;
  nbShowInfo = 0;
  maxShowInfo =infoVal.length;
  if(maxShowInfo==0) {
    console.log("Dedicated Server Info ("+maxShowInfo+")");
    back(null);
  } else {
    infoVal.forEach(accountInfo);  
  }
};
