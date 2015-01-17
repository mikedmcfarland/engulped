var minimist    = require('minimist')
var requireDir  = require('require-dir')
var _           = require('lodash')
var plugins     = require('gulp-load-plugins')()
var debug       = require('debug')('engulped')
var path        = require('path')

function engulped(gulp) {
  var argv = minimist(process.argv.slice(2))
  var mode = argv._.indexOf('dev') !== -1 ? 'dev' : 'prod'

  var gulpPath = path.dirname(require.resolve('gulp')) +
    '/bin/gulp.js'

  var nodeExec = path.dirname(require.resolve('6to5')) +
    '/../../bin/6to5-node'

  var config = {
    mode : mode,
    argv : argv,
    nodeExec: nodeExec,
    gulpPath : gulpPath,
    paths : {
      test : './test/',
      src  : './lib/',
      dest : './dist/'
    }
  }

  //Add all tasks
  var tasks = requireDir('tasks')
  debug('loading tasks %o',tasks)

  _.forEach(tasks, function(task) {
    task(gulp,plugins,config)
  })

}

module.exports = engulped
// gulp.task('default',['watch'],function(){

// })

// var dist = 'dist'
// gulp.task('clean',function(){
//   wrench.rmdirSyncRecursive(dist,true)
// })

// gulp.task('moveNonJsFiles',['clean'], function(){
//   return gulp.src(src + '/**/*!(.js)')
//         .pipe(gulp.dest('dist'))
// })

// gulp.task('es6to5',['clean'],function(){
//   return gulp.src(src + '/**/*.js')
//     .pipe(sourcemaps.init())
//     .pipe(traceur())
//     // .pipe(concat('settling.js'))
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('dist'))
// })
