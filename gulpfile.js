const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const colors = require("ansi-colors");
const csso = require("gulp-csso");
const browserSync = require("browser-sync").create();
const webpack = require("webpack-stream");
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

const js = function(cb) {
  return webpack(require("./webpack.config.js"), function(err, stats) {
    if (err) throw err;
    console.log(stats.toString());
    browserSync.reload();
    cb();
  });
};

const watch = function() {
  gulp.watch("src/scss/**/*.scss", gulp.series(scss));
  gulp
    .watch("src/html/**/*.html", gulp.series(html))
    .on("change", browserSync.reload);
  gulp.watch("src/images/**", gulp.series(img));
};

exports.default = gulp.series(server, html, scss, watch, img);
exports.img = img;
exports.scss = scss;
exports.watch = watch;
exports.js = js;
exports.html = html;
