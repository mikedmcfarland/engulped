var util    = require('./util')
var nodemon = require('gulp-nodemon')

function addDefaultTasks(engulped){
  var tasks      = engulped.tasks()
  var gulp       = engulped.gulp

  gulp.task('clean',tasks.clean())
  gulp.task('build',['clean'],tasks.transpile())
  gulp.task('test', tasks.test())
  gulp.task('test-debug',tasks.debugGulp('test'))
  gulp.task('watch',function(){
    nodemon({
      script : util.gulpPath() + ' test'
    })
  })
}

module.exports = addDefaultTasks
