var gulp = require('gulp'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    rename = require('gulp-rename'),
    connect = require('connect'),
    http = require('http'),
    livereload = require('gulp-livereload'),
    connectreload = require('connect-livereload'),
    serveStatic = require('serve-static');


var config = {
  src: 'src',
  dist: 'dist',
  externalLibs: [],
  port: 9000,
  livereloadPort: 35729
};

gulp.task('compile', function() {
  return browserify('./'+config.src+'/main.js')
    .external(config.externalLibs)
    .bundle({
      debug: true,
      standalone: 'path'
    })
    .pipe(source('path.js'))
    .pipe(gulp.dest(config.dist))
    .pipe(rename({suffix: '.min'}))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(config.dist))
});

gulp.task('server', function() {
  var app = connect()
    .use(connectreload({ port: config.livereloadPort }))
    .use('/lib', serveStatic('dist'))
    .use('/test', serveStatic('test'))
    .use('/examples', serveStatic('examples'))
    .use('/bower_components', serveStatic('bower_components'));

  http.createServer(app)
    .listen(config.port)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:' + config.port);
    });
});


gulp.task('watch', ['compile', 'server'], function () {
  var server = livereload.listen();
    // Watch for changes in `dist` folder, reload
    gulp.watch('dist/*').on('change', function(file) {
      server.changed(file.path);
    });

    // Watch .less files
    gulp.watch('src/**/*', ['compile']);
});


// Watch-compile, server
gulp.task('default', ['watch']);