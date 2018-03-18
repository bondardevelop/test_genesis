var gulp     = require('gulp'),
sass         = require('gulp-sass'),
browserSync  = require('browser-sync'),
concat       = require('gulp-concat'),
uglify       = require('gulp-uglifyjs'),
cssnano      = require('gulp-cssnano'),
del          = require('del'),
autoprefixer = require('gulp-autoprefixer'),
imagemin     = require('gulp-imagemin'),
pngquant     = require('imagemin-pngquant'),
rename       = require('gulp-rename');

gulp.task('scss', function() {
	return gulp.src('app/scss/**/*.scss')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 version', '>1%', 'ie 8', 'ie 7']))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function() {
  return gulp.src(['app/libs/jquery/dist/jquery.min.js', 'app/libs/jquery-ui/jquery-ui-1.8.19.custom.min.js'])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'))
});

gulp.task('css-libs', ['scss'], function() {
  return gulp.src('app/css/libs.css')
  .pipe(cssnano())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', function() {
	browserSync({
		server:{
			baseDir:'app'
		},
		notify:false
	});
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
	gulp.watch('app/scss/**/*.scss', ['scss']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/**/*.js', browserSync.reload);
});

//----------prodaction------------//
gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
  .pipe(imagemin({
  	interlaced:true,
  	progressive:true,
  	use:[pngquant()]
  }))  
  .pipe(gulp.dest('dist/img/'));
});

gulp.task('build', ['clean', 'img', 'scss', 'scripts'], function() {

	var buildCss = gulp.src([
		'app/css/main.css',
		'app/css/libs.min.css'
		])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));
});