var fs = require('fs');
var https = require('https');
var connect = require('connect');
var serveStatic = require('serve-static');

var options = {
    host: 'localhost',
    localAddress: '127.0.0.1',
    port: 8080,
    path: '/',
    method: 'GET',
    passphrase: // hide password from project
        fs.readFileSync('../../../../SSL/localhost.pass', 'utf8'),
    pfx: fs.readFileSync('../../../../SSL/localhost-with-key.pfx'),
    requestCert: false,
    secureProtocol: false,
    rejectUnauthorized: false,
    agent: false
};

var app = connect().use(serveStatic(__dirname + '/wwwroot'));
https.createServer(options, app).listen(8080);
//connect().use(serveStatic(__dirname + '/wwwroot')).listen(8080);