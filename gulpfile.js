const gulp = require('gulp')
const kss = require('kss')
// const uglify = require('gulp-uglify')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const copy = require('gulp-copy')
const clean = require('gulp-clean')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')

const watch = require('gulp-watch')

const kssConfig = require('./kss-config.json')
const browserSync = require('browser-sync').create()

const config = {
  path: {
    css: './dist/css'
  },
  browsers: ['last 2 versions']
}

const tasks = [
  'assets',
  'styles',
  // 'scripts',
  'styleguide:assets',
  'styleguide:build'
]

// Minify CSS, add vendor prefixes, save to /dist/css folder
gulp.task('styles', function () {
  return gulp.src('./src/rua.scss', { base: './src' })
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: config.browsers, cascade: false }))
    .pipe(gulp.dest(config.path.css))
    .pipe(cleanCSS())
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(gulp.dest(config.path.css))
})

gulp.task('assets', function () {
  return gulp.src('./src/8-assets/**/*')
    .pipe(copy('./dist/assets/', {
      prefix: 2
    }))
})

gulp.task('styleguide:clean', function () {
  return gulp.src('./styleguide/rua-assets/**/*')
    .pipe(clean({
      allowEmpty: true
    }))
})

gulp.task('styleguide:assets', function () {
  return gulp.src('dist/**/*')
    .pipe(copy('./styleguide/rua-assets/', {
      prefix: 1
    }))
})

gulp.task('styleguide:build', function () {
  return kss(kssConfig)
})

gulp.task('styleguide:serve', function() {
  browserSync.init({
      server: {
          baseDir: "./styleguide"
      }
  })
})

gulp.task('watch', function () {
  browserSync.init({
    server: {
        baseDir: "./styleguide"
    }
  })
  return watch('./src/**/*', gulp.series(tasks))
})

gulp.task('default', gulp.series(tasks))
