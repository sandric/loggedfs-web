var http = require('http');
var loggedfsClientFactory = require('./loggedfs-web.js');

var eLoggedfsClient = new loggedfsClientFactory();

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    eLoggedfsClient.start(function(data){
      res.write(data);
    }, function(code){
    });
}).listen(1337, '0.0.0.0');
console.log('Server running at http://127.0.0.1:1337/');
