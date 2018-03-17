const child_process = window.require('child_process');

function findProcess(packageName, callback) {
  child_process.exec('adb shell ps', function(error, stdout, stderr) {
    if (error) {
      callback("", stderr);
    } else {
      callback(isContains(stdout.split(/\s+/), packageName));
    }
  });
}
