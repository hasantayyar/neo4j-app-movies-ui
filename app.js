
//var __dirname = "/";

var connect = require('connect');
connect.createServer(
    connect.static(__dirname)
).listen(8080, function() {
  console.log('Express server listening on port ' + 8080);
});