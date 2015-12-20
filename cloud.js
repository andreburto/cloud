module.exports = {
    TOKEN: '',
    DEVICE_ID: '',
    post_opt: {
        host: 'api-http.littlebitscloud.cc',
        port: '443'
    },
    init: function(tkn, did) {
        this.TOKEN = tkn;
        this.DEVICE_ID = did;
    },
    send_bit: function(callback, amount, length) {
        var https = require('https');
        var post_body = "";
        var resp_body = "";
        var post_opt = this.post_opt;
        
        // Set the percent
        if (amount) { post_body += "percent="+amount; }
        else { post_body += "percent=100"; }
        
        // Set the duration
        if (length) { post_body += "&duration_ms="+length; }
        else { post_body += "&duration_ms=1000"; }
        
        post_opt.path = '/devices/' + this.DEVICE_ID + '/output';
        post_opt.method = 'POST';
        post_opt.headers = {
            'Accept': 'application/vnd.littlebits.v2+json',
            'Authorization': 'Bearer '+this.TOKEN,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(post_body)
        };
        
        var post_req = https.request(post_opt, function(res) {
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                resp_body += chunk;
            });
            res.on('end', function() {
                if (res.statusCode == 200) {
                    callback(resp_body);
                } else {
                    console.log('Response: '+resp_body);
                    console.log('Status: '+res.statusCode);
                }
            });
        });
        
        post_req.write(post_body);
        post_req.end();
    },
};