var gulp = require('gulp');
var scp = require('gulp-scp');
var gitWatch = require('gulp-git-watch');

gulp.task('git-watch', function() {
	gitWatch()
		.on('check', function() {
			console.log('CHECK!');
		})
		.on('change', function(newHash, oldHash) {
			console.log('CHANGES! FROM', oldHash, '->', newHash);
		});
});


gulp.task('deploy', function() {
  // place code for your default task here
});
