var loggedfsClient = function(){
  this.terminal = require('child_process').spawn('loggedfs', ['-f', '-p', '/home', '-c', '/home/sandric/loggedfs.xml']);
};

loggedfsClient.prototype.start = function(onDataCallback, onEndCallback) {
  this.terminal.stdout.on('data', onDataCallback);
  this.terminal.on('exit', onEndCallback);
};

module.exports = loggedfsClient;
