const gulp = require("gulp");
const deploy = require("gulp-gh-pages");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const colors = require("ansi-colors");
const csso = require("gulp-csso");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const nunjucksRender = require("gulp-nunjucks-render");
const image = require("gulp-image");

const showError = function(err) {
  console.log(colors.red("==============================="));
  console.log(colors.red(err.messageFormatted));
  console.log(colors.red("==============================="));
};

const server = function(cb) {
  browserSync.init({
    server: {
      baseDir: "dist"
    },
    notify: false,
    open: true
  });
  cb();
};

const img = function() {
  gulp
    .src("src/images/**")
    .pipe(image())
    .pipe(gulp.dest("dist/images"))
    .pipe(browserSync.stream());
};

const html = function() {
  return gulp
    .src("src/html/*.html")
    .pipe(
      nunjucksRender({
        path: ["./src/html"]
      })
    )
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
};

const scss = function() {
  return gulp
    .src("src/scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "compressed"
      }).on("error", showError)
    )
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
};

const js = function() {
  return gulp
    .src("src/js/**/*")
    .pipe(concat("index.js"))
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream());
};

const watch = function() {
  gulp.watch("src/scss/**/*.scss", gulp.series(scss));
  gulp
    .watch("src/html/**/*.html", gulp.series(html))
    .on("change", browserSync.reload);
  gulp
    .watch("src/images/**", gulp.series(img))
    .on("change", browserSync.reload);
  gulp
    .watch("src/js/**/*.js", gulp.series(js))
    .on("change", browserSync.reload);
};

const deployPages = function() {
  return gulp.src("./dist/**/*").pipe(deploy());
};

exports.default = gulp.series(server, html, scss, js, watch);
exports.img = img;
exports.scss = scss;
exports.watch = watch;
exports.js = js;
exports.html = html;
exports.deploy = deployPages;
