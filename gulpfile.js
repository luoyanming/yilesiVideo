function formatDate() {
    var formatdate = new Date(),
        year = formatdate.getFullYear(),
        month = formatdate.getMonth(),
        day = formatdate.getDate(),
        hour = formatdate.getHours(),
        minute = formatdate.getMinutes(),
        second = formatdate.getSeconds();

    month = (month + 1) < 10 ? ('0' + (month + 1)) : (month + 1);
    day = day < 10 ? ('0' + day) : day;
    hour = hour < 10 ? ('0' + hour) : hour;
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;

    return year +''+ month +''+ day +'.'+ hour +''+ minute +''+ second;
}

var dest = 'dist';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
	cleancss = require('gulp-clean-css'),
    notify = require('gulp-notify'),
    header = require('gulp-header'),
    plumber = require('gulp-plumber'),
	uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect');

var pkg = require('./package.json'),
    notes = ['/**',
      ' * @author <%= pkg.author.name %>',
      ' * @email <%= pkg.author.email %>',
      ' * @descrip <%= pkg.description %>',
      ' * @version v<%= pkg.version %>',
      ' */',
      ''].join('\n');


gulp.task('sass', function() {
    return gulp.src('dev/**/*.scss')
            .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
            .pipe(sass())
            .pipe(cleancss())
            .pipe(header(notes, { pkg : pkg } ))
            .pipe(gulp.dest(dest))
            .pipe(livereload());
});

gulp.task('css', function(){
	return gulp.src('dev/**/*.css')
            .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
			.pipe(cleancss())
			.pipe(gulp.dest(dest))
            .pipe(livereload());
});

gulp.task('uglifyjs', function() {
	return gulp.src(['dev/**/*.js','!dev/**/*.min.js'])
            .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
			.pipe(uglify())
            .pipe(header(notes, { pkg : pkg } ))
			.pipe(gulp.dest(dest))
            .pipe(livereload());
});

gulp.task('minjs', function(){
	return gulp.src('dev/**/*.min.js')
            .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
			.pipe(gulp.dest(dest))
            .pipe(livereload());
});

gulp.task('images', function(){
    return gulp.src('dev/**/*.{png,jpg,gif,svg,ico}')
            .pipe(gulp.dest(dest))
            .pipe(livereload());
});

gulp.task('html', function(){
    return gulp.src('dev/**/*.html')
            .pipe(gulp.dest(dest))
            .pipe(livereload());
});

gulp.task('change', function() {
    gulp.src([
        'dev/**/*.html',
        'dev/**/*.scss',
        'dev/**/*.css',
        'dev/**/*.{png,jpg,gif,svg,ico}',
        'dev/**/*.js'
        ])
        .pipe(connect.reload());
});

gulp.task('webserver', function() {
    connect.server({
        host: '',
        port: 9999,
        root: './' + dest,
        livereload: true
    });
});

gulp.task('watch', function() {
    gulp.watch('dev/**/*.scss', ['sass']);
    gulp.watch('dev/**/*.css', ['css']);
    gulp.watch(['dev/**/*.js', '!dev/**/*.min.js'], ['uglifyjs']);
    gulp.watch('dev/**/*.min.js', ['minjs']);
    gulp.watch('dev/**/*.{png,jpg,gif,svg,ico}', ['images']);
    gulp.watch('dev/**/*.html', ['html']);
    gulp.watch([
        'dev/**/*.html',
        'dev/**/*.scss',
        'dev/**/*.{png,jpg,gif,svg,ico}',
        'dev/**/*.js'
        ], ['change']);
});

gulp.task('server', ['sass', 'css', 'uglifyjs', 'minjs', 'images', 'html', 'webserver', 'watch']);
