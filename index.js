var minimist    = require('minimist')
var requireDir  = require('require-dir')
var _           = require('lodash')
var plugins     = require('gulp-load-plugins')()
var debug       = require('debug')('engulped')
var path        = require('path')

function engulped(gulp) {
  var argv = minimist(process.argv.slice(2))

  var gulpPath = path.dirname(require.resolve('gulp')) +
    '/bin/gulp.js'

  // var nodeExec = path.dirname(require.resolve('6to5')) +
  //   '/../../bin/6to5-node'
  var nodeExec = "node"

  var config = {
    argv : argv,
    nodeExec: nodeExec,
    gulpPath : gulpPath,
    debug : debug,
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
