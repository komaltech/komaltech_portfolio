var gulp = require('gulp'),
    cssnano = require('gulp-cssnano'),
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    runSequence = require('run-sequence'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync');

    var browser_support = [
                        'last 2 versions', 
                        '> 5%', 
                        'Firefox ESR',
                        "ie >= 10",
                        "ie_mob >= 10",
                        "ff >= 30",
                        "chrome >= 34",
                        "safari >= 7",
                        "opera >= 23",
                        "ios >= 7",
                        "android >= 4.4",
                        "bb >= 10"
                      ];

gulp.task('default', function() {
    runSequence(
        'semantic'
    );
});

gulp.task('style', function() {
    gulp.src('public/sass/base.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed', errLogToConsole: true}).on('error', sass.logError))
    .pipe(cssnano({autoprefixer: {browsers: browser_support, add: true} }))
    .pipe(cleanCSS())
    .pipe(concat('app.min.css'))
    // .pipe(autoprefixer())
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest('./web/css/'))
});

gulp.task('script', function() {
    gulp.src('public/js/global.js')
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./web/js/'))
});


gulp.task('stream', function() {
    return watch('public/sass/**/*.sass', { ignoreInitial: false })
        .pipe(gulp.dest('./web/css/'))
});

gulp.task('serve', function() {
  browserSync.init({
    server: "./"
  });
  gulp.watch("./public/sass/**/*.sass", ['style']).on('change', browserSync.reload);
  gulp.watch("./public/js/**/*.js", ['script']).on('change', browserSync.reload);
  gulp.watch("./pages/**/*.html").on('change', browserSync.reload);
});
