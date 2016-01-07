var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname+'/wwwroot')).listen(8080);