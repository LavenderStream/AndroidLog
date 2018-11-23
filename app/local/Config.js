let fs = require('fs');
let exec = require('child_process').exec;
let beautifyJs = require('js-beautify');
let path = require('path');

function push(device, callback) {
    exec("adb -s " + device.id + " push " + "./config.json /sdcard/package.json", callback);
}

function edit(device, robotId, host, stomp, callback) {
    let json = {
        "host": host,
        "robotId": robotId,
        "stomp": stomp
    };

    fs.writeFile('./config.json', JSON.stringify(json), callback);
}

function log(device, callback) {
    exec("adb -s " + device.id + " pull /sdcard/ex/ ", callback);
}

function cat(callback) {
    fs.readFile('./config.json', 'utf8', function (err, data) {
        if (!err) {
            callback(beautifyJs(data));
        }
        else callback("呵呵");
    });
}

exports.push = push;
exports.cat = cat;
exports.log = log;
exports.edit = edit;