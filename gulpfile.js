/// <binding Clean='clean' />
'use strict';
var args = require('yargs').argv,
  gulp = require('gulp'),
  rimraf = require('rimraf'),
  $ = require('gulp-load-plugins')({
    lazy: true
  }),
  project = require('./project.json');

var paths = {
  webroot: './' + project.webroot + '/'
};

paths.js = paths.webroot + 'js/**/*.js';
paths.minJs = paths.webroot + 'js/**/*.min.js';
paths.css = paths.webroot + 'css/**/*.css';
paths.minCss = paths.webroot + 'css/**/*.min.css';
paths.concatJsDest = paths.webroot + 'js/site.min.js';
paths.concatCssDest = paths.webroot + 'css/site.min.css';

gulp.task('bootlint', function(){
  gulp.src('Views/**/*.cshtml')
    .pipe($.bootlint({
      disabledIds: ['E001', 'E007']
    }));
});

gulp.task('clean:js', function(callback) {
  clean(paths.concatJsDest, callback);
});

gulp.task('clean:css', function(callback) {
  clean(paths.concatCssDest, callback);
});

gulp.task('clean', ['clean:js', 'clean:css']);

/**
 * Optimizes JavaScript for the production environment.
 * @return {Stream}
 * Example: gulp min:js
 *
 * --verbose: Displays the files matched by the globbing pattern.
 */
gulp.task('min:js', function() {
  gulp.src([paths.js, '!' + paths.minJs], {
      base: '.'
    })
    .pipe($.if(args.verbose, $.size({
      showFiles: true,
      title: 'JavaScript'
    })))
    .pipe($.concat(paths.concatJsDest))
    .pipe($.uglify())
    .pipe(gulp.dest('.'));
});

/**
 * Optimizes CSS for the production environment.
 * @return {Stream}
 * Example: gulp min:css
 *
 * --verbose: Displays the files matched by the globbing pattern.
 */
gulp.task('min:css', function() {
  gulp.src([paths.css, '!' + paths.minCss])
    .pipe($.if(args.verbose, $.size({
      showFiles: true,
      title: 'CSS'
    })))
    .pipe($.concat(paths.concatCssDest))
    .pipe($.cssmin())
    .pipe(gulp.dest('.'));
});

gulp.task('min', ['min:js', 'min:css']);

/**
 * Cleans the specified file path.
 */
function clean(path, callback) {
  rimraf(path, callback);
}