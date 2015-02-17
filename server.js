var http = require('http');
var fs = require('fs');

var loggedfsClientFactory = require('./loggedfs-web.js');

fs.readFile('./styles.css', function (err, css) {

  if(err) throw err;

  var eLoggedfsClient = new loggedfsClientFactory();
  
  console.log('Server running at http://127.0.0.1:1337/');

  http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<style>" + css  + "</style>");

    eLoggedfsClient.start(function(data){
      var resultingString = "<div class = 'item'>";
      for(var el in data)
        resultingString += "<div class = '" + el + "'>" + data[el] + "</div>";
      resultingString += "</div>";
      res.write(resultingString);
    }, function(code){
    });
  }).listen(1337, '0.0.0.0');
});
