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
      if(!data) return;

      var resultingString;

      if(data.rawString) {
        resultingString = "<div class = 'item_raw'>" + data.rawString + "</div>";
      } else {
        resultingString = "<div class = 'item" + (data.result ? "":"_red")  + "'>";
        
        resultingString += "<div class = 'time'>" + data.time + "</div>";

        var readWriteActionFlag = "";
        if(/(read \d+ bytes from|\d+ bytes read from)/.exec(data.action)) 
          readWriteActionFlag += "_read"
        else if(/(write \d+ bytes to|\d+ bytes written to)/.exec(data.action))
          readWriteActionFlag += "_write"; 

        resultingString += "<div class = 'action" + (readWriteActionFlag || "_" + data.action) + "'>" + data.action + "</div>";
        resultingString += "<div class = 'attempt'>" + data.attempt + "</div>";
        resultingString += "<div class = 'pid'>" + data.pid + "</div>";
        resultingString += "<div class = 'pname'>" + data.pname + "</div>";
        resultingString += "<div class = 'uid'>" + data.uid + "</div>";

        resultingString += "</div>";
      }
      resultingString += "</div>";

      resultingString += "<script>window.scrollTo(0,document.body.scrollHeight);</script>";
      res.write(resultingString);
    }, function(code){
    });
  }).listen(1337, '0.0.0.0');
});
