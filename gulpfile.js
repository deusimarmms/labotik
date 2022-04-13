const gulp = require("gulp");
const concat = require("gulp-concat");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const imagemin = require('gulp-imagemin');

function tarefasCSS(cb) {
  return gulp

    .src("./vendor/**/*.css")
    .pipe(concat("libs.css"))
    .pipe(cssmin())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest("./dist/css"));
}


function tarefasJS() {
  return gulp.src('./vendor/**/*.js')
  .pipe(concat('libs.js'))
  .pipe(uglify())
  .pipe(rename({suffix:'.min'}))
  .pipe(gulp.dest('./dist/js'))

}

function tarefasImagem() {
  return gulp.src('./src/img/*')
  .pipe(imagemin({
    pngquant:true,
    optipng:false,
    zopflipng:true,
    jpegRecompress:false,
    mozjpeg:true,
    svgo:true,
    concurrent:10,
    quiet:true
  }))
  .pipe(gulp.dest('./public/img'))
}


exports.styles = tarefasCSS;
exports.scripts = tarefasJS;
exports.imagemin = tarefasImagem