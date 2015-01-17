var spawn       = require('child_process').spawn

function test (gulp,plugins,config) {

  var mocha = plugins.mocha
  var gutil = plugins.util

  gulp.task('test',      reRunGulp('test-execute'))
  gulp.task('test-debug',reRunGulp('test-execute',['--debug-brk']))

  //run all mocha tests, beep if theres an error
  gulp.task('test-execute',function() {
    var tests = [config.paths.test + '/**/**Spec.js']
    return gulp.src(tests, {read: false})
    .pipe(mocha())
    .on('error',function(error) {
      gutil.log(error)
      gutil.beep()
    })
  })

  //Useful so that we can run gulp directly, and still
  //add the needed flags, or change the executable.
  //We spawn a new node, and inherit the stdio
  function reRunGulp(taskName,nodeArgs){
    return function() {
      if(nodeArgs === undefined){
        nodeArgs = []
      }

      var gulpTestCommand = [
        config.gulpPath,
        taskName
      ]

      spawn(
        config.nodeExec,
        nodeArgs.concat(gulpTestCommand),
        //share IO, so it seems like the same process
        {stdio : 'inherit'})
    }
  }
}


module.exports = test
