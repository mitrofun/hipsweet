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
const minify = require('gulp-minify-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const htmlreplace = require('gulp-html-replace');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const gulpFilter = require('gulp-filter');
const mainBowerFiles = require('gulp-main-bower-files');
const concat = require('gulp-concat');
const prefixer = require('gulp-autoprefixer');
const rimraf = require('rimraf');
const pngquant = require('imagemin-pngquant');
const stripDebug = require('gulp-strip-debug');

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


gulp.task('dev',
    gulp.series('dev:jade','dev:compass', gulp.parallel('dev:watch', 'dev:serve'))
);


gulp.task('prod:clean', function (cb) {
    rimraf('build', cb);
});

// Compile CSS from SCSS compass for production
gulp.task('prod:css', function() {
  return gulp.src('src/sass/**/*.scss')
    .pipe(compass({
        config_file: 'src/prod.rb',
        css: 'src/css',
        sass: 'src/sass'
      }))
    .pipe(gulp.dest('build/css'))
});

gulp.task('prod:js', function () {
  return gulp.src('src/js/**/*.js')
      .pipe(stripDebug())
      .pipe(uglify('scripts.js'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('build/js/'));

});

gulp.task('prod:html', function() {
  return gulp.src(['src/templates/**/*.jade','!src/templates/**/_*.jade'])
    .pipe(jade({pretty: true}))
    .pipe(htmlreplace({
        'css': 'css/main.min.css',
        'js': 'js/app.min.js'
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build/'));
});

gulp.task('prod:img', function(cb) {
    gulp.src(['src/img/**/*.*','!src/img/icon/**/*.*'])
        .pipe(imagemin({
        optimizationLevel: 5,
        progressive: true,
        use: [pngquant()]
        }))
        .pipe(gulp.dest('build/img/')).on('end', cb).on('error', cb);
});

gulp.task('prod:fonts', function() {
    return gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('prod:ico', function() {
    return gulp.src('src/ico/**/*.*')
        .pipe(gulp.dest('build/ico'));
});

gulp.task('prod:vendors', function() {
    var filterJS = gulpFilter('**/*.js', { restore: true });
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles({
            overrides: {
                "jquery.inputmask": {
                    main: [
                        './dist/jquery.inputmask.bundle.js'
                    ]
                }
            }
        }))
        .pipe(filterJS)
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(filterJS.restore)
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('build/vendors'));

});

gulp.task('prod:build-js', function () {
    var filterJS = gulpFilter('**/*.js', { restore: true });
    return gulp.src(['build/vendors/*.min.js', 'build/js/*.min.js'])
        .pipe(filterJS)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(filterJS.restore)
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('build/js'));
});

gulp.task('prod:build-css', function() {
  return gulp.src(['build/vendors/**/*.min.css','build/css/main.css'])
    .pipe(concat('main.css'))
    .pipe(prefixer({
            browser: ['last 3 version', "> 1%", "ie 8", "ie 7"]
    }))
    .pipe(minify({keepBreaks: false}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/css/'));
});

gulp.task('prod:unused', function (cb) {
  rimraf('build/vendors', cb);
  rimraf('build/css/main.css', cb);
});

gulp.task('build',
    gulp.series(
        'prod:clean',
        'prod:css',
        'prod:js',
        'prod:html',
        'prod:vendors',
        'prod:img', 
        'prod:ico', 
        'prod:fonts',
        'prod:build-css',
        'prod:build-js',
        'prod:unused'
    )
);