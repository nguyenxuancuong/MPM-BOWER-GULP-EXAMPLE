// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var minifyCss = require('gulp-cssnano');
var uglify = require('gulp-uglify');

// Define base folders
var src = 'src/';
var dest = 'build/';

// Compile CSS from Sass files
gulp.task('sass', function () {
    return gulp.src('./public/sass/*.scss')
        .pipe(concat('main.scss'))
        .pipe(sass())
        // .pipe(sass.sync().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload());
});
gulp.task('script', function () {
    return gulp.src('./public/module/**/*.js')
        .pipe(concat('main.js'))
        .pipe(rename('js.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'))
        .pipe(livereload());
});

// Watch Files For Changes
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(['./public/sass/**/*'], ['sass']);
    gulp.watch(['./public/module/**/*'], ['script']);
});

// Default Task
gulp.task('default', ['sass','script', 'watch']);