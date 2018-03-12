const child_process = require('child_process');

function startDaemon(packageName, callback) {
  setInterval(function(){
    findProcess(packageName, function(res){
      callback(res);
    });
  }, 800);
}

function findProcess(packageName, callback) {
  child_process.exec('adb shell ps', function(error, stdout, stderr) {
    if (error) {
      callback("", stderr);
    } else {
      callback(isContains(stdout.split(/\s+/), packageName));
    }
  });
}

function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}

exports.daemon = startDaemon
