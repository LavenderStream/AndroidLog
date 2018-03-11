var readline = require('readline');
var exec = require('child_process').exec;

var respone = {};
var mPid;

function readLine(pid, callback) {
  mPid = pid;
  var rl = readline.createInterface(process.stdin, null);
  rl.on('line', function(line) {
    if (mPid === "") return;
    var lines = line.split(/\s+/);
    var l = lines[4];
    var p = lines[2];
    var f = (p == mPid);
    if (!mPid) {
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

function setPid(pid){
  mPid = pid;
}

exports.read = readLine
exports.setPid = setPid
