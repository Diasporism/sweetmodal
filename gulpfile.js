var gulp = require('gulp');

var glob       = require('glob');
var path       = require('path');
var jshint     = require('gulp-jshint');
var sass       = require('gulp-sass');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');
var babelify   = require('babelify');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var wrap       = require('gulp-wrap');
var qunit      = require('gulp-qunit');

// Lint Task
gulp.task('lint', function() {
  gulp.src('dev/sweetmodal.es6.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));

  return gulp.src('dev/*/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
  gulp.src('example/example.scss')
    .pipe(sass())
    .pipe(rename('example.css'))
    .pipe(gulp.dest('example'));

  // (We don't use minifyCSS since it breaks the ie9 file for some reason)
  gulp.src(['dev/sweetmodal.scss', 'dev/ie9.css', 'dev/loader-animation.css'])
    .pipe(sass())
    .pipe(concat('sweetmodal.css'))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('../test-modals/app/assets/stylesheets/sweetmodal')); // Test repo
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return browserify({
      entries: './dev/sweetmodal.es6.js',
      debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('sweetmodal-dev.js'))
    .pipe(wrap({
      src: './dev/gulpfile-wrap-template.js'
    }))
    .pipe(gulp.dest('dist')) // Developer version
    .pipe(gulp.dest('../test-modals/app/assets/javascripts/sweetmodal')) // Test repo

    .pipe(rename('sweetmodal.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist')); // User version
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(['dev/*.js', 'dev/*/*.js'], ['lint', 'scripts']);
  gulp.watch(['dev/*.scss', 'dev/*.css'], ['sass']);
  gulp.watch('themes/*/*.scss', ['themes']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
