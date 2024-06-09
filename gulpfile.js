const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

function styles() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
}

function images() {
    return gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

function serve() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./src/styles/*.scss', styles);
    gulp.watch('./src/images/**/*', images);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./dist/js/*.js').on('change', browserSync.reload); // Adicionando também arquivos JS caso haja necessidade
}

exports.default = gulp.parallel(styles, images);
exports.watch = serve;
