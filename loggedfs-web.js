var config = require('./config.json');

var loggedfsClient = function(){
  this.terminal = require('child_process').spawn('loggedfs', ['-f', '-p', config.mount_directory, '-c', config.loggedfs_config]);
};

loggedfsClient.prototype.start = function(onDataCallback, onEndCallback) {
  var that = this;
  this.terminal.stdout.on('data', function(data) {
    var chunks = data.toString().split('\n');
    for(var i in chunks) {
      onDataCallback(that.parseOutput(chunks[i]));
    }
  });

  this.terminal.on('exit', onEndCallback);
};

loggedfsClient.prototype.parseOutput = function(outputString) {
  if(!outputString) return null;

  var re = /(.*) \(src\/loggedfs\.cpp:\d*\) (.*?) (\/.*) \{(.*)\} \[ pid += (\d*) (.*) uid = (\d*) +\]/; 
  var match = re.exec(outputString);

  var parsedOutput;
  if (match == null) {
    parsedOutput = {
      rawString: outputString
    };
  }
  else
    parsedOutput = {
      time: match[1],
      action: match[2],
      attempt: match[3],
      result: match[4] === 'SUCCESS' ? true:false,
      pid: +match[5],
      pname: match[6],
      uid: +match[7]
    };

  return parsedOutput;
};

module.exports = loggedfsClient;
