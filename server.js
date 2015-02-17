var http = require('http');
var loggedfsClientFactory = require('./loggedfs-web.js');

var eLoggedfsClient = new loggedfsClientFactory();

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    eLoggedfsClient.start(function(data){
      var resultingString = "<div class = 'item'>";
      for(var el in data)
        resultingString += "<div class = '" + el + "'>" + data[el] + "</div>";
      
      res.write(resultingString);
    }, function(code){
    });
}).listen(1337, '0.0.0.0');
console.log('Server running at http://127.0.0.1:1337/');
