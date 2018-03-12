//$ adb logcat | node app.js xxx
var color = require('./src/color.js');
var cmd = require('./src/process.js');
var pid = require('./src/pid.js');
var daemon = require('./src/daemon.js');
var loading = require('./src/loading.js');
var mPackageName = "";

pid.pid(process.argv[2], function(pids) {
  mPackageName = process.argv[2];
  cmd.read(pids[1], function(res) {
    color.render(res);
  });
});

daemon.daemon(process.argv[2], function(find) {
  if (find) {
    loading.stop();
    pid.pid(mPackageName, function(pids) {
      cmd.setPid(pids[1]);
    });
  } else {
    cmd.setPid("");
    loading.start();
  }
});
