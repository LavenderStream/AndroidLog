const child_process = require('child_process');

function findDevices(callback) {
  child_process.exec('adb devices -l', function(error, stdout, stderr) {
    if (error) {
      callback("", stderr);
    } else {
      var array = stdout.split(/\s+/).toString().split(",");
      var results = [];
      for (var i = 4; i < array.length; i += 5) {
        var device = {};
        device.name = array[i];
        device.model = array[i + 2];
        //console.log("name: " + device.name);
        //console.log("model: " + device.model);
        if (device.name && device.model) {
          results.push(device);
        }
      }
      callback(results);
    }
  });
}

exports.findDevices = findDevices;
