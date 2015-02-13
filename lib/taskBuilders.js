var _          = require('lodash')
var lazypipe   = require('lazypipe')
var to5        = require('gulp-6to5')
var rimraf     = require('rimraf')
var mocha      = require('gulp-mocha')
var sourcemaps = require('gulp-sourcemaps')
var gutil      = require('gulp-util')
var util       = require('./util')
var debug      = require('debug')('engulped')

var transpileChannel = lazypipe()
  .pipe(function() {
    return sourcemaps.init()
  })
  .pipe(to5)
  .pipe(function(){
    return sourcemaps.write('./')
  })

var clean = function(dirs){
  dirs.forEach(function(dir){
    rimraf(dir,function(error){
      if(error)
        console.error('error cleaning',error)
    })
  })
}

var runTests = function(gulp,paths) {
  return gulp.src(paths,{read: false})
    .pipe(mocha())
    .on('error',function(error) {
      gutil.log(error)
      gutil.beep()
    })
}

/*
 * Clean directory
 */
var cleanTask = function(gulp,config,dirs){
  dirs = dirs ||  _(config.paths)
    .pluck('dest')
    .reject(_.isUndefined)
    .value()
  clean(dirs)
}

/*
 * Run specs in directory (es6 registered)
 */
var testTask = function(gulp,config,dir){
  dir = dir || config.paths.test.src
  return config.registered(function(){
    return runTests(gulp,dir + config.paths.test.pattern)
  })
}

/*
 * Transpile source from es6 to es5 (src -> dest)
 */
var transpileTask = function(gulp,config,src,dest){
  return function(){
    src  = src  || config.paths.script.src
    dest = dest || config.paths.script.dest

    return gulp.src(src + config.paths.script.pattern)
      .pipe(transpileChannel())
      .pipe(gulp.dest(dest))
  }
}

/*
 * Run script with node-debug
 */
var debugTask = function(gulp,config,script){
  var cmd =  util.nodeDebugPath()
  return function(){
    util.runCommand(cmd,script)
  }
}

/*
 * run gulp task with node-debug (es6 registered)
 */
var debugGulpTask = function(gulp,config,taskname){
  return config.registered(
    debugTask(gulp,config,[util.gulpPath(),taskname]))
}

module.exports = {
  transpileChannel : transpileChannel,
  runTests         : runTests,
  clean            : clean,
  tasks            : {
    clean     : cleanTask,
    transpile : transpileTask,
    test      : testTask,
    debug     : debugTask,
    debugGulp : debugGulpTask
  }
}