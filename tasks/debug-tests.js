var path        = require('path')
var spawn       = require('child_process').spawn

function debugTests(gulp,plugins) {
 gulp.task('test-debug',function(cb){
  //make a "gulp test", with debug-brk set
  var cwd = process.cwd()
  var gulpTestCommand = [
    '--debug-brk',
    path.join(cwd, 'node_modules/gulp/bin/gulp.js'),
    'test'
  ]
  spawn(
    'node',
    gulpTestCommand,
    //share IO, so it seems like the same process
    { stdio: 'inherit' }); 
  }) 
}

module.exports = debugTests;
