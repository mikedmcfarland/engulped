var rimraf = require('rimraf')
function build (gulp,plugins,config) {
  gulp.task('clean',function() {
    var dest = config.paths.dest
    rimraf(dest,function(error) {
      if(error){
        console.error('error cleaning',error)
      }
    })
  })
}

module.exports = build
