// xdsl.js
// ========
require('console.table');
var ovh = null;
var infoV =  new Array();
var back = null;


module.exports = {
  info: function (callback, ovhConnect)  {
    ovh = ovhConnect;
    ovh.request('GET', '/xdsl', function (err, infoVal) {
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
  ovh.request('GET', '/xdsl/'+ serviceName, function (err, val) {
      if(err) {
        console.log(err, servers);
        callback(err);
      }
      else {
        var contact = {
            service :  serviceName,
            description : val.description,
            street: val.address.street,
            city: val.address.city,
            zipCode: val.address.zipCode
        };

        infoV.push(contact);
        endShowInfo(); 
      }
    });
}

var nbShowInfo = 0;
var maxShowInfo =0;
var endShowInfo = function() {
  nbShowInfo++;
  if (nbShowInfo === maxShowInfo) {
    console.log("XDSL Info ("+maxShowInfo+")");
    console.table(infoV);

    back(null);
  }
}

var showInfos = function(callback, infoVal) {
  infoV =  new Array();
  back = callback;
  nbShowInfo = 0;
  maxShowInfo =infoVal.length;
  if(maxShowInfo==0) {
    console.log("XDSL Info ("+maxShowInfo+")");
    back(null);
  } else {
    infoVal.forEach(accountInfo);  
  }
};