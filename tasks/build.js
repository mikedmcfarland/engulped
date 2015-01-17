function build (gulp,plugins,config) {

  var sourcemaps = plugins.sourcemaps
  var to5        = plugins['6to5']

  var dest = config.paths.dest
  var src = [
    config.paths.src + '/**/*.js'
  ]

  gulp.task('build',['clean'],function() {
    return gulp.src(src)
      .pipe(sourcemaps.init())
      .pipe(to5())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(dest))
  })
}

module.exports = build
