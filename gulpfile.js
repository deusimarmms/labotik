const {series, parallel} = require("gulp"); 
const gulp = require("gulp");
const concat = require("gulp-concat");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin')
const stripJs = require('gulp-strip-comments');
const strip = require('gulp-strip-comments'); 
const stripCssComments = require('gulp-strip-css-comments'); 
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload



/* Vendor */
function tarefasCSS(cb) {
  return gulp
    
    .src("./vendor/**/*.css")
    .pipe(concat("libs.css"))
    .pipe(cssmin())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest("./dist/css"));
}
/* Estilo do css */
function styleCSS(cb) {
  return gulp

    .src("./src/css/**/*.css")
    .pipe(stripCssComments())
    .pipe(concat("style.css"))
    .pipe(cssmin())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest("./dist/css"));
}


function tarefasJS() {
  return gulp.src('./vendor/**/*.js')
  .pipe(babel({
    comments:false,
    presets:['@babel/env']
  }))
  .pipe(concat('libs.js'))
  .pipe(uglify())
  .pipe(rename({suffix:'.min'}))
  .pipe(gulp.dest('./dist/js'))

}
function appJS() {
  return gulp.src('./src/**/*.js')
  .pipe(babel({
    comments:false,
    presets:['@babel/env']
  }))
  .pipe(concat('app.js'))
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
/* POC  PROOF OF CONCEPT*/
function tarefasHTML(cb) {
  gulp.src('./src/*.html')
  .pipe(strip())
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('./dist'))
  return cb()

}

gulp.task('serve', function () {
  browserSync.init({
      server: {
          baseDir: "."
      }
  });

  gulp.watch("*./src/**/").on("change", process); // repete o processo quando alterar algo em src
  gulp.watch("*.html").on("change", reload);
});






exports.styles = tarefasCSS;
exports.style = styleCSS;
const process = series(tarefasHTML,tarefasCSS,tarefasJS,appJS,styleCSS )
exports.default = process
exports.scripts = tarefasJS;
exports.script= appJS;
exports.imagemin = tarefasImagem