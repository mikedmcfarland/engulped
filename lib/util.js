var spawn = require('child_process').spawn
var path  = require('path')

function runCommand(cmd,args){
  console.log(args)
    spawn(
      cmd,
      args,
      //share IO, so it seems like the same process
      {stdio : 'inherit'})
}

function to5Path(){
  return  path.dirname(require.resolve('6to5')) +
    '/../../bin/6to5-node'
}

function gulpPath() {
  return path.dirname(require.resolve('gulp')) +
    '/bin/gulp.js'
}

function nodeDebugPath(){
  return path.dirname(require.resolve('node-inspector')) +
    '/bin/node-debug.js'
}

module.exports = {
  runCommand    : runCommand,
  gulpPath      : gulpPath,
  to5Path       : to5Path,
  nodeDebugPath : nodeDebugPath
}
