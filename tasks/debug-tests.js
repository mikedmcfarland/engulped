var path        = require('path')
var spawn       = require('child_process').spawn

function debugTests(gulp,plugins,config) {
 gulp.task('test-debug',function(cb){

  //make a "gulp test", with debug-brk set
  var gulpTestCommand = [
    '--debug-brk',
    config.gulpPath,
    'test'
  ]
  spawn(
    config.nodeExec,
    gulpTestCommand,
    //share IO, so it seems like the same process
    { stdio: 'inherit' });
  })
}

module.exports = debugTests;
