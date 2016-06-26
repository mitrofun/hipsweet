"use strict";
// Include Gulp
const gulp = require('gulp');

// All of your plugins
const jade = require('gulp-jade');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const compass = require('gulp-compass');
const browserSync = require('browser-sync').create();

// Watch files for changes
gulp.task('dev:watch', function() {
    gulp.watch('src/templates/**/*.jade',  gulp.series('dev:jade'));
    gulp.watch('src/sass/**/*.scss',  gulp.series('dev:compass'));
});


// Compile HTML from Jade for development
gulp.task('dev:jade', function() {
    return gulp.src(['src/templates/**/*.jade','!src/templates/**/_*.jade'])
        .pipe(debug({title: 'src'}))
        .pipe(jade({pretty: true}))
        .pipe(debug({title: 'jade'}))
        .pipe(gulp.dest('src/'))
        .pipe(notify({ message: 'Your Jade file has been molded into HTML.' }));
});

// Compile CSS from SCSS compass for development
gulp.task('dev:compass', function() {
  return gulp.src('src/sass/**/*.scss')
    .pipe(compass({
        config_file: 'src/config.rb',
        css: 'src/css',
        sass: 'src/sass'
      }))
    .pipe(gulp.dest('src/css'))
    .pipe(notify({ message: 'Your SASS file has been molded into CSS.' }));
});

// Run server for development
gulp.task('dev:serve', function () {
   browserSync.init({
       server: 'src'
   });
   browserSync.watch("src/css/*.css", function (event, file) {
        if (event === "change") {
            browserSync.reload("*.css");
    }
   });
   browserSync.watch('src/*.html').on('change', browserSync.reload);
});


gulp.task('default',
    gulp.series('dev:jade', 'dev:watch')
);

gulp.task('dev',
    gulp.series('dev:jade','dev:compass', gulp.parallel('dev:watch', 'dev:serve'))
);
