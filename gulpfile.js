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
});


// Compile HTML from Jade
gulp.task('dev:jade', function() {
    return gulp.src(['src/templates/**/*.jade','!src/templates/**/_*.jade'])
        .pipe(debug({title: 'src'}))
        .pipe(jade({pretty: true}))
        .pipe(debug({title: 'jade'}))
        .pipe(gulp.dest('src/'))
        .pipe(notify({ message: 'Your Jade file has been molded into HTML.' }));
});

gulp.task('dev:serve', function () {
   browserSync.init({
       server: 'src'
   });
   browserSync.watch('src/*.html').on('change', browserSync.reload);
});


gulp.task('default',
    gulp.series('dev:jade', 'dev:watch')
);

gulp.task('dev',
    gulp.series('dev:jade', gulp.parallel('dev:watch', 'dev:serve'))
);
