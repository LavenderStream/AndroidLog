var readline = require('readline');
var exec = require('child_process').exec;

var respone = {};
var mPid;
var mTempTag = "xxx"

function readLine(pid, callback) {
  mPid = pid;
  var rl = readline.createInterface(process.stdin, null);
  rl.on('line', function(line) {
    if (mPid === "")
      return;
    var lines = line.split(/\s+/);
    var l = lines[4];
    var p = lines[2];
    var f = (p == mPid);
    if (!mPid) {
      f = true;
    }
    if (l && f) {
      respone.tag = l;
      var tLine = clipping(line, lines[5]);
      respone.line = tLine;
      callback(respone);
    }
  }).on('close', function() {
    process.exit(0);
  });
}

function clipping(line, tag, tid) {
  if (!tid) tid = "";
  var tLine;
  var i = line.indexOf(tag);
  if (mTempTag == tag) {
    tLine = line.substring(i, line.length)
    tLine = new Array(i + 1 - tid.length).join(" ") + tLine;
  } else {
    tLine = line;
  }
  mTempTag = tag;
  return tLine;
}

function removeDate(line, date) {
  var i = date.length;
  var tLine = line.substring(i, line.length)
  return tLine.trim();
}

function removePid(line, pid) {
  var i = line.indexOf(pid)
  var startLine = line.substring(0, i);
  var endLine = line.substring(i + pid.length, line.length);
  return startLine.trim() + endLine;
}

function removeTid(line, tid) {
  var i = line.indexOf(tid)
  var startLine = line.substring(0, i);
  var endLine = line.substring(i + tid.length, line.length);
  return startLine.trim() + endLine;
}

function setPid(pid) {
  mPid = pid;
}

exports.read = readLine
exports.setPid = setPid
