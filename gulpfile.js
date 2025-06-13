let gulp = require('gulp');
let sass = require('gulp-sass')(require('sass'));
let sourcemaps = require('gulp-sourcemaps');
let imagemin = require('gulp-imagemin');
let uglify = require('gulp-uglify');

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

// Tarefa de minificação de imagens
function images() {
    return gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
}

// Tarefa de comprimir arquivo JS
function comprimeJs() {
    return gulp.src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts'))
}

// Função do watch files
function watchFiles() {
    gulp.watch('./src/styles/*.scss', { ignoreInitial: false}, stylesDev);
    gulp.watch('./src/images/*', { ignoreInitial: false}, images);
    gulp.watch('./src/scripts/*.js', { ignoreInitial: false}, comprimeJs);
}

exports.dev = gulp.series(stylesDev, watchFiles, images, comprimeJs);
exports.build = gulp.series(stylesBuild, images, comprimeJs);
exports.default = exports.dev;