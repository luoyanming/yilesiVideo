var dest = 'dist',
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleancss = require('gulp-clean-css'),
    notify = require('gulp-notify'),
    header = require('gulp-header'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector');

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
            .pipe(rev())
            .pipe(gulp.dest(dest))
            .pipe(rev.manifest())
            .pipe(gulp.dest('./rev/css'))
            .pipe(livereload());
});

gulp.task('css', function(){
    return gulp.src('dev/**/*.css')
            .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
            .pipe(gulp.dest(dest))
            .pipe(livereload());
});

gulp.task('uglifyjs', function() {
    return gulp.src(['dev/**/*.js','!dev/**/*.min.js','!dev/**/util.js'])
            .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
            .pipe(uglify())
            .pipe(header(notes, { pkg : pkg } ))
            .pipe(rev())
            .pipe(gulp.dest(dest))
            .pipe(rev.manifest())
            .pipe(gulp.dest('./rev/js'))
            .pipe(livereload());
});

gulp.task('minjs', function(){
    return gulp.src(['dev/**/*.min.js','dev/**/util.js'])
            .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
            .pipe(gulp.dest(dest))
            .pipe(livereload());
});

gulp.task('images', function(){
    return gulp.src('dev/**/*.{png,jpg,gif,svg,ico}')
            .pipe(gulp.dest(dest))
            .pipe(livereload());
});

gulp.task('rev', function() {
    return gulp.src(['rev/**/*.json', 'dev/**/*.html'])
            .pipe(revCollector())
            .pipe(gulp.dest(dest))
            .pipe(livereload());

});

gulp.task('change', function() {
    gulp.src([
        'rev/**/*.json',
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
        port: 9002,
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
    gulp.watch(['rev/**/*.json', 'dev/**/*.html'], ['rev']);
    gulp.watch([
        'rev/**/*.json',
        'dev/**/*.html',
        'dev/**/*.scss',
        'dev/**/*.{png,jpg,gif,svg,ico}',
        'dev/**/*.js'
        ], ['change']);
});

gulp.task('server', ['sass', 'css', 'uglifyjs', 'minjs', 'images', 'rev', 'webserver', 'watch']);
