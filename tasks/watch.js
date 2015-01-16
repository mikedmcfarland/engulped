var path = require('path')
function watch(gulp,plugins,config) {
  var nodemon = plugins.nodemon

  gulp.task('watch',function() {
   nodemon({
     execMap: {
       "js" : config.nodeExec
     },
     script: config.gulpPath
    })
  })
}

module.exports = watch;
