var colors = require('colors')
var config = require('./config.json');

function verbose(message) {
  console.log(message.cyan)
}

function error(message) {
  console.log(message.red)
}

function info(message) {
  console.log(message.blue)
}

function debug(message) {
  console.log(message.green)
}

function warn(message) {
  console.log(message.yellow)
}

function wtf(message) {
  console.log(message.rainbow)
}

exports.verbose = verbose;
exports.debug = debug
exports.info = info
exports.warn = warn
exports.error = error
exports.wtf = wtf
