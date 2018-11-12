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

const webpack = require('gulp-webpack')
const webpackConfig = require('./webpack.config.js')

const browserSync = require('browser-sync').create()

const async = require('async')
const iconfont = require('gulp-iconfont')
const consolidate = require('gulp-consolidate')

const config = {
  path: {
    css: './dist/css',
    js: './dist/js'
  },
  browsers: [
    'last 5 versions'
  ]
}

const tasks = [
  'assets',
  'styles',
  'icons',
  'scripts',
  'styleguide:build',
  'styleguide:assets'
]

const runTimestamp = Math.round(Date.now()/1000)

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

gulp.task('scripts', function() {
  return gulp.src('./src/rua.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(config.path.js))
})

gulp.task('assets', function () {
  return gulp.src('./src/8-assets/**/*')
    .pipe(copy('./dist/assets/', {
      prefix: 2
    }))
})

gulp.task('icons', function(done){
  const iconStream = gulp.src(['./src/4-icons/svgs/*.svg'])
    .pipe(iconfont({
      fontName: 'rua-font',
      prependUnicode: true,
      normalize: true,
      fontHeight: 1001,
      fixedWidth: true,
      centerhorizontally: true,
      formats: ['ttf', 'eot', 'woff'],
      timestamp: runTimestamp
    }))

  return async.parallel([
    function handleGlyphs (cb) {
      iconStream.on('glyphs', function(glyphs, options) {
        gulp.src('./src/4-icons/rua-font.css')
          .pipe(consolidate('lodash', {
            glyphs: glyphs,
            fontName: 'rua-font',
            fontPath: '../fonts/',
            className: 'ri'
          }))
          .pipe(gulp.dest(config.path.css))
          .pipe(cleanCSS())
          .pipe(rename(function (path) {
            path.basename += '.min';
          }))
          .pipe(gulp.dest(config.path.css))
          .on('finish', cb)
      })
    },
    function handleFonts (cb) {
      iconStream
        .pipe(gulp.dest('./dist/fonts/'))
        .on('finish', cb)
    }
  ], done)
})

gulp.task('styleguide:clean', function () {
  return gulp.src('./styleguide/rua-assets/**/*')
    .pipe(clean({
      allowEmpty: true
    }))
})

gulp.task('styleguide:build', function () {
  return kss(kssConfig)
})

gulp.task('styleguide:assets', function () {
  return gulp.src('dist/**/*')
    .pipe(copy('./styleguide/rua-assets/', {
      prefix: 1
    }))
})

gulp.task('styleguide:reload', function() {
  browserSync.reload
})

gulp.task('watch', function () {
  browserSync.init({
    server: {
        baseDir: "./styleguide"
    }
  })

  tasks.push('styleguide:reload')

  watch(
    './src/**/*',
    { ignoreInitial: false },
    gulp.series(tasks)
  )

  watch('gulpfile.js').on('change', () => process.exit(0));
})

gulp.task('default', gulp.series(tasks))
