// gulpfile.js

// 1. ІМПОРТИ (REQUIRES)
const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano'); // Мінімізація CSS
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const del = require('del'); // Використання del для clean
const concat = require('gulp-concat');
const uglify = require('gulp-uglify'); // Мінімізація JS
const fileInclude = require('gulp-file-include'); // Підтримка HTML інклудів
const rename = require('gulp-rename');
// Додаткові імпорти для старих gulp-тасків можна не використовувати в новій структурі

// 2. ЗМІННІ ШЛЯХІВ (PATHS)
// ВАЖЛИВО: Використовуємо 'paths' для уникнення конфлікту з вбудованим модулем 'path'
const paths = {
    src: 'src/',
    dist: 'dist/',
    // Шляхи до вихідних файлів усередині src/
    html: 'app/**/*.html', // Якщо ви використовуєте src/app/ для HTML
    scss: 'app/scss/main.scss',
    js: 'app/js/**/*.js',
    images: 'app/images/**/*',
    data: 'data.json'
};

// 3. ФУНКЦІЇ ТАСКІВ

//  Очистка папки dist
function clean() {
    return del([paths.dist]);
}

//  HTML (Підтримка інклудів)
function html() {
    return src(paths.src + paths.html)
        .pipe(plumber())
        .pipe(fileInclude()) // Обробка @@include
        .pipe(dest(paths.dist)) // Копіює у dist/
        .pipe(browserSync.stream()); // Оновлює браузер
}

//  SCSS / CSS (Компіляція, мінімізація, sourcemaps, перейменування)
function styles() {
    return src(paths.src + paths.scss, { allowEmpty: true })
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError)) // Компіляція SCSS -> CSS
        .pipe(cssnano()) // Мінімізація
        .pipe(rename('index.min.css')) // Перейменовуємо у index.min.css
        .pipe(sourcemaps.write('.')) // Запис sourcemaps
        .pipe(dest(paths.dist + 'css/')) // Збереження в dist/css/
        .pipe(browserSync.stream());
}

//  JS (Конкатенація, мінімізація, sourcemaps)
function scripts() {
    return src(paths.src + paths.js, { allowEmpty: true })
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js')) // Об'єднання
        .pipe(uglify()) // Мінімізація
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.dist + 'js/'))
        .pipe(browserSync.stream());
}

//  Images (Мінімізація зображень)
function images() {
    return src(paths.src + paths.images, { allowEmpty: true })
        .pipe(imagemin())
        .pipe(dest(paths.dist + 'images/'))
        .pipe(browserSync.stream());
}

// Bootstrap JS (Копіювання JS-файлу Bootstrap)
function bootstrapJs() {
    return src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
        .pipe(dest(paths.dist + 'js/')); // ВИПРАВЛЕНО: використовуємо paths.dist
}

//  Data JSON (Копіювання JSON-файлу для AJAX)
function data() {
    return src(paths.src + paths.data)
        .pipe(dest(paths.dist)); // Копіюємо у dist/
}

//  Сервер та Слідкування за змінами (Watch)
function serve() {
    browserSync.init({
        server: {
            baseDir: paths.dist
        }
    });

    // Слідкування за змінами:
    watch(paths.src + paths.html, html);
    watch(paths.src + 'app/components/**/*.html', html); // Слідкуємо за HTML-інклудами
    watch(paths.src + 'app/scss/**/*.scss', styles);
    watch(paths.src + paths.js, scripts);
    watch(paths.src + paths.images, images);
    watch(paths.src + paths.data, data); // Слідкуємо за JSON-даними
}

// 4. ЕКСПОРТИ

// Експорт окремих тасків
exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.data = data;
exports.bootstrapJs = bootstrapJs;
exports.serve = serve;

//  Default таск: Очистка -> Паралельне виконання всіх збірок -> Запуск сервера та слідкування
exports.default = series(
    clean,
    // Всі таски збірки виконуються паралельно
    parallel(html, styles, scripts, images, bootstrapJs, data),
    serve
);