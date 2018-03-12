var color = require('./color.js');
var isRunning = false;
var mInterval;
var message = "";

function showLoading() {
  if(isRunning) return;
  if(message.length > 800) return;

  isRunning = true;
  message = "";
  mInterval = setInterval(function() {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    message += "#";
    process.stderr.write(message.rainbow);

  }, 800)
}

function hideLoading() {
  if(!isRunning) return;

  console.log("\r");
  isRunning = false;
  mCount = 0;
  message = "";
  if (mInterval) {
    clearTimeout(mInterval);
    mInterval = null;
  }
}


exports.start = showLoading
exports.stop = hideLoading
