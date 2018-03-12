const child_process = require('child_process');
let isRunning = false;
let mPackageName = "";

function getPid(packageName, callback) {
  mPackageName = packageName;
  child_process.exec('adb shell ps', function(error, stdout, stderr) {
    if (error) {
      callback("", stderr);
    } else {
      var arrs = stdout.split('\n');
      arrs.forEach(e => {
        var subs = e.split(/\s+/);
        if (subs[8] == mPackageName) callback(subs);
      });
    }
  })
}

function setPackageName(name){
mPackageName = name;
}

exports.pid = getPid
exports.setPackage = setPackageName
