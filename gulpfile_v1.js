// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var minifyCss = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');
var less = require('gulp-less');

// Define base folders
var src = 'public/';
var dest = 'public/';
var component = '../bower_components/**/*';
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

gulp.task('js', function() {    
	gulp.src(mainBowerFiles())
		.pipe(filter('**/*.js'))
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest(dest + 'js'));
});
gulp.task('css', function() {
	// var cssFiles = ['src/css/*'];
	gulp.src(mainBowerFiles())
		.pipe(filter('**/*.less'))
		.pipe(concat('lib.less'))
        .pipe(less())
		// .pipe(uglify())
		.pipe(gulp.dest(dest + 'css'));
});





// Watch Files For Changes
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(['./public/sass/**/*'], ['sass']);
    gulp.watch(['./public/module/**/*'], ['script']);
    // gulp.watch(['./public/module/**/*'], ['css']);
});

// Default Task
gulp.task('default', ['sass','script','css', 'watch']);