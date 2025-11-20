// Підключення модулів
const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");

// Шляхи
const paths = {
    html: {
        src: "app/*.html",
        dest: "dist/"
    },
    styles: {
        src: "app/sass/**/*.sass",
        dest: "dist/css/"
    },
    scripts: {
        src: "app/js/**/*.js",
        dest: "dist/js/"
    },
    images: {
        src: "app/img/**/*",
        dest: "dist/img/"
    }
};

// --- HTML ---
function htmlTask() {
    return src(paths.html.src)
        .pipe(dest(paths.html.dest))
        .pipe(browserSync.stream());
}

// --- SASS → CSS ---
function stylesTask() {
    return src(paths.styles.src)
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss([autoprefixer({ overrideBrowserslist: ['last 2 versions'] })]))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest(paths.styles.dest))
        .pipe(browserSync.stream());
}


// --- JS ---
function scriptsTask() {
    return src(paths.scripts.src)
        .pipe(concat("scripts.js"))
        .pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest(paths.scripts.dest))
        .pipe(browserSync.stream());
}

// --- Images ---
function imagesTask() {
    return src(paths.images.src)
        .pipe(imagemin())
        .pipe(dest(paths.images.dest))
        .pipe(browserSync.stream());
}

// --- BrowserSync + Watch ---
function watchTask() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
    watch(paths.html.src, htmlTask);
    watch(paths.styles.src, stylesTask);
    watch(paths.scripts.src, scriptsTask);
    watch(paths.images.src, imagesTask);
}

// --- Default Task ---
exports.default = series(
    parallel(htmlTask, stylesTask, scriptsTask, imagesTask),
    watchTask
);

// --- Експорт окремих тасків ---
exports.html = htmlTask;
exports.styles = stylesTask;
exports.scripts = scriptsTask;
exports.images = imagesTask;
exports.watch = watchTask;
