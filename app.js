//$ adb logcat | node app.js xxx
var color = require('./color.js');
var cmd = require('./process.js');
var pid = require('./pid.js');
var daemon = require('./daemon.js');
var mPackageName = "";

pid.pid(process.argv[2], function(pids) {
  mPackageName = process.argv[2];
  cmd.read(pids[1], function(res) {
    color.render(res);
  });
});

daemon.daemon(process.argv[2], function(find){
  if (find){
    pid.pid(mPackageName, function(pids) {
      cmd.setPid(pids[1]);
    });
  }else {
      cmd.setPid("");
      color.wtf("#############################");
  }
});
