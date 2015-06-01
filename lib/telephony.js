// telephony.js
// ========
require('console.table');
var ovh = null;
var infoV =  [];
var back = null;

module.exports = {
  info: function (callback, ovhConnect)  {
    ovh = ovhConnect;
    ovh.request('GET', '/telephony', function (err, infoVal) {
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

var accountInfo = function(billingAccount, i, array) {
  ovh.request('GET', '/telephony/'+billingAccount, function (err, val) {
      if(err) {
        console.log(err, servers);
        callback(err);
      }
      else {
        var contact = {
            service : billingAccount,
            description : val.description
        };
        serviceInfos(billingAccount, contact);
      }
  });
};

var nbShowInfo = 0;
var maxShowInfo =0;
var endShowInfo = function() {
  nbShowInfo++;
  if (nbShowInfo === maxShowInfo) {
    console.log("Telephony Info ("+maxShowInfo+")");
    console.table(infoV);

    back(null);
  }
};

var lines = function(billingAccount, contact) {
  ovh.request('GET', '/telephony/'+billingAccount+'/line', function (err, val) {
      if(err) {
        console.log(err, servers);
        callback(err);
      }
      else {
        contact.nbLine =  val.length;

        infoV.push(contact);
        endShowInfo();        
      }
    });
};

var serviceInfos = function(billingAccount, contact) {
  ovh.request('GET', '/telephony/'+billingAccount+'/serviceInfos', function (err, val) {
      if(err) {
        console.log(err, servers);
        callback(err);
      }
      else {
        contact.billing =  val.contactBilling;
        contact.tech = val.contactTech;
        contact.admin = val.contactAdmin;

        lines(billingAccount, contact);  
      }
    });
};



var showInfos = function(callback, infoVal) {
  infoV = [];
  back = callback;
  nbShowInfo = 0;
  maxShowInfo =infoVal.length;
  if(maxShowInfo===0) {
    console.log("Telephony Info ("+maxShowInfo+")");
    back(null);
  } else {
    infoVal.forEach(accountInfo);  
  }
};
