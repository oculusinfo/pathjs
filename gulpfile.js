var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var connect = require('connect');
var http = require('http');
var livereload = require('gulp-livereload');
var connectreload = require('connect-livereload');
var serveStatic = require('serve-static');

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
    .pipe(gulp.dest(config.dist));
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


gulp.task('default', ['watch'], function() {

});