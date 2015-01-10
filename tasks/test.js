function test (gulp,plugins,config) {

  var mocha = plugins.mocha
  var gutil = plugins.util

  gulp.task('test',function() {
    var tests = [config.paths.test + '/*.js']
    return gulp.src(tests, {read: false})
    .pipe(mocha())
    .on('error',function(error) {
      gutil.log(error)
      gutil.beep()
    })
  })
}

module.exports = test;