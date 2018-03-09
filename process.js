var readline = require('readline');
var exec = require('child_process').exec;

var respone = {};

function readLine(pid, callback) {
  var rl = readline.createInterface(process.stdin, null);
  rl.on('line', function(line) {
    var lines = line.split(/\s+/);
    //console.log("line: " + lines);
    var l = lines[4];
    var p = lines[2];
    var f = p == pid;
    if (!pid) {
      f = true;
    }
    if (l && f) {
      respone.tag = l;
      respone.line = line;
      callback(respone);
    }
  }).on('close', function() {
    process.exit(0);
  });
}

exports.read = readLine
