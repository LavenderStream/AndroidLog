const child_process = require('child_process');

function findDevices(callback) {
    child_process.exec('adb devices -l', function (error, stdout, stderr) {
        if (error) {
            callback("", stderr);
        } else {
            let results = [];
            let array = stdout.split("\n");
            for (let i = 1; i < array.length - 2; i++) {
                let line = array[i].split(/\s+/);
                let device = {};
                device.name = line[3].split(":")[1];
                device.id = line[0];

                if (device.name && device.id) {
                    results.push(device);
                }
            }
            callback(results);
        }
    });
}

exports.findDevices = findDevices;
