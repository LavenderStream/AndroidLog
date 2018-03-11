var colors = require('colors')

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

function render(res) {
  switch (res.tag) {
    case 'V':
      verbose(res.line);
      break;
    case 'I':
      info(res.line);
      break;
    case 'D':
      debug(res.line)
      break;
    case 'W':
      warn(res.line)
      break;
    case 'E':
      error(res.line)
      break;
  }
}

exports.verbose = verbose;
exports.debug = debug
exports.info = info
exports.warn = warn
exports.error = error
exports.wtf = wtf
exports.render = render
