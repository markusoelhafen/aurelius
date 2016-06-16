var gulp = require('gulp');
var gscp = require('gulp-scp');
var watch = require('gulp-watch');
// define server connection in config.json file
var config = require('config.json');

gulp.task('watch', function() {
	gulp.watch('./*', ['deploy']):
});


gulp.task('deploy', function() {
  return gulp.src('./*')
  .pipe(scp({
    host: config.server, // enter pi address here
    username: config.user,
    password: config.password,
    dest: config.path
  }))
  .on('error', function(err) {
    console.log(err);
  });
});
