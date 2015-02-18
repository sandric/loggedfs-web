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
      var resultingString;

      if(data.rawString) {
        resultingString = "<div class = 'item_raw'>" + data.rawString + "</div>";
      } else {
        resultingString = "<div class = 'item" + (data.result ? "":"_red")  + "'>";
        
        resultingString += "<div class = 'time'>" + data.time + "</div>";
        resultingString += "<div class = 'action'>" + data.action + "</div>";
        resultingString += "<div class = 'attempt'>" + data.attempt + "</div>";
        resultingString += "<div class = 'pid'>" + data.pid + "</div>";
        resultingString += "<div class = 'pname'>" + data.pname + "</div>";
        resultingString += "<div class = 'uid'>" + data.uid + "</div>";

        resultingString += "</div>";
      }
      resultingString += "</div>";
      res.write(resultingString);
    }, function(code){
    });
  }).listen(1337, '0.0.0.0');
});
