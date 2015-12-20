var cloud = require("./cloud.js");

var callback = function(msg) {
    j = JSON.parse(msg);
    if (j.success == true) {
        console.log("ok");
    } else {
        console.log("error");
    }
}

cloud.init('',
           '');

cloud.send_bit(callback);