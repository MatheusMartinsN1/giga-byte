let gulp = require('gulp');
let sass = require('gulp-sass')(require('sass'));
let sourcemaps = require('gulp-sourcemaps');
let imagemin = require('gulp-imagemin');

// Tarefa para desenvolvimento
function stylesDev() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on ('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'))
}

// Tarefa para a construção
function stylesBuild() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./build/styles'))
}

// Função do ImageMin
function images() {
    return gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
}

// Função do watch files
function watchFiles() {
    gulp.watch('./src/styles/*.scss', { ignoreInitial: false}, stylesDev);
    gulp.watch('./src/images/*', { ignoreInitial: false}, images);
}

exports.dev = gulp.series(stylesDev, watchFiles, images);
exports.build = gulp.series(stylesBuild, images);
exports.default = exports.dev;