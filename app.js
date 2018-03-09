var color = require('./color.js');
var cmd = require('./process.js');
var pid = require('./pid.js');

pid.pid(process.argv[2], function(res) {
  cmd.read(res[1], function(res) {
    switch (res.tag) {
      case 'V':
        color.verbose(res.line);
        break;
      case 'I':
        color.info(res.line);
        break;
      case 'D':
        color.debug(res.line)
        break;
      case 'W':
        color.warn(res.line)
        break;
      case 'E':
        color.error(res.line)
        break;
    }
  });
});
