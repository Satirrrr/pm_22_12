// gulpfile.js
const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const del = require('del');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const gulp = require('gulp'); // Залишаємо require('gulp') для старих тасків
const fileInclude = require('gulp-file-include');


// Шляхи
const path = {
    src: 'src/',
    dist: 'dist/'
};

// Очистка папки dist
function clean() {
    return del([path.dist]);
}

// ## 📄 HTML
// Оновлений таск: тепер шукає **всі .html файли безпосередньо в src/ та будь-яких підпапках**
// Якщо index.html в src/, він його знайде.
// Якщо інші .html файли є в src/pages/, він їх також знайде.
function html() {
    return src(path.src + 'app/**/*.html') // шукає всі HTML у src/app
        .pipe(dest(path.dist))              // копіює у dist/
        .pipe(browserSync.stream());        // оновлює браузер
}



// ---

// ## 🎨 SCSS / CSS
function styles() {
    return src(path.src + 'app/scss/**/*.scss', { allowEmpty: true })
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(path.dist + 'css/'))
        .pipe(browserSync.stream());
}



// ---

// ## 💻 JS
function scripts() {
    return src(path.src + 'app/js/**/*.js', { allowEmpty: true })
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(path.dist + 'js/'))
        .pipe(browserSync.stream());
}


// ---

// ## 🖼️ Images
function images() {
    return src(path.src + 'app/images/**/*', { allowEmpty: true })
        .pipe(imagemin())
        .pipe(dest(path.dist + 'images/'))
        .pipe(browserSync.stream());
}


// ---

// ## 🚀 Сервер та слідкування за змінами
function serve() {
    browserSync.init({
        server: {
            baseDir: path.dist
        }
    });

    watch(path.src + 'app/**/*.html', html);
    watch(path.src + 'app/components/**/*.html', html); // слідкуємо за інклудами
    watch(path.src + 'app/scss/**/*.scss', styles);
    watch(path.src + 'app/js/**/*.js', scripts);
    watch(path.src + 'app/images/**/*', images);
}


// ---

// ## 📦 Bootstrap таски (залишаються без змін)

// TASK: копіювання Bootstrap CSS у dist/css
gulp.task('bootstrap-css', function () {
    return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('dist/css'));
});

// TASK: копіювання Bootstrap JS у dist/js
gulp.task('bootstrap-js', function () {
    return gulp.src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
        .pipe(gulp.dest('dist/js'));
});

// TASK для запуску обох
gulp.task('bootstrap', gulp.parallel('bootstrap-css', 'bootstrap-js'));

// ---

// ## ⚙️ Експорти та Default таск
exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.serve = serve;
exports.bootstrap = gulp.task('bootstrap'); // Експортуємо Bootstrap таск

// Default
exports.default = series(
    clean,
    parallel(html, styles, scripts, images, 'bootstrap'), // Додано 'bootstrap'
    serve
);