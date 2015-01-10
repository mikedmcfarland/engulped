function watch(gulp,plugins) {
  var nodemon = plugins.nodemon
  var gulpPath = 'node_modules/gulp/bin/gulp.js'
  gulp.task('watch',function() {
   nodemon({
    nodeArgs: ['--harmony'],
    script: gulpPath 
    })
  })
}

module.exports = watch;