var spawn = require('child_process').spawn
var path  = require('path')

function runCommand(cmd,args){
    spawn(
      cmd,
      args,
      //share IO, so it seems like the same process
      {stdio : 'inherit'})
}

function babelPath(){
  return  path.dirname(require.resolve('babel')) +
    '/../../bin/babel-node'
}

function gulpPath() {
  return path.dirname(require.resolve('gulp')) +
    '/bin/gulp.js'
}

module.exports = {
  runCommand : runCommand,
  gulpPath   : gulpPath,
  babelPath  : babelPath
}
