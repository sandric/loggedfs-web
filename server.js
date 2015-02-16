var http = require('http');
var loggedfsClientFactory = require('./loggedfs-web.js');

var eLoggedfsClient = new loggedfsClientFactory();

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    //var loggedfsClient = new loggedfsClientFactory();

    eLoggedfsClient.start(function(data){
      console.log('out: ' + data);
      res.write(data);
    }, function(code){
      console.log('END OF ERA: ' + code);
      res.end('end of era: ' + code);
    });

    //res.end('Hello World\n');
}).listen(1337, '0.0.0.0');
console.log('Server running at http://127.0.0.1:1337/');
