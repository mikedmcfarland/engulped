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
    //adding arguments to the script seems to work when using
    //nodemon from my own gulpfiles, but not from within a
    //module that's a dependency. No idea why, but if a watch
    //for a gulp task (other then the default) is needed; then
    //it should be defined in the actual gulpfile.
    nodemon({
      script : util.gulpPath(),
      ignore: ['dist']
    })
  })
}

module.exports = addDefaultTasks
