const child_process = require('child_process');

function getPid(packageName, callback) {
  child_process.exec('adb shell ps', function(error, stdout, stderr) {
    if (error) {
      callback("", stderr);
    } else {
      var arrs = stdout.split('\n');
      arrs.forEach(e => {
        var subs = e.split(/\s+/);
        if (subs[8] == packageName) callback(subs);
      });
    }
  })
}

exports.pid = getPid
