import gulp from 'gulp';
import path from 'path';
import del from 'del';
import minifyCSS from 'gulp-minify-css';
import { SOURCE, DESTINATION, STYLES } from './settings';

const $ = require('gulp-load-plugins')({
  pattern: '*'
});

const environment = $.util.env.type || 'development';
const isProduction = environment === 'production';
const webpackConfig = require('./webpack.config.js')[environment];
const port = $.util.env.port || 1337;

const autoprefixerBrowsers = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('scripts', () => {
  return gulp.src(webpackConfig.entry)
    .pipe($.webpackStream(webpackConfig))
    .pipe(isProduction ? $.uglifyjs() : $.util.noop())
    .pipe(gulp.dest(`${DESTINATION}/js/`))
    .pipe($.size({ title : 'js' }))
    .pipe($.connect.reload());
});

gulp.task('styles', () => {
  return gulp.src(`${STYLES}/main.scss`)
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.autoprefixer())
    .pipe($.rename('main.css'))
    .pipe(minifyCSS({keepBreaks:true}) )
    .pipe(gulp.dest(`${DESTINATION}/css`))
})

gulp.task('jade', () => {
  return gulp.src(`${SOURCE}/views/index.jade`)
  .pipe($.plumber())
  .pipe($.jade({
    pretty: true,
  }))
  .pipe(gulp.dest(`${DESTINATION}`))
});


gulp.task('images', () => {
  return gulp.src(`${SOURCE}/*.{jpg,png}`)
    .pipe($.imagemin({
      progressive: true
    }))
    .pipe(gulp.dest(`${DESTINATION}/assets/images`))
});

gulp.task('watch', () => {
  gulp.watch(`${SOURCE}/views/**/*.jade`, 'jade');
  gulp.watch(`${SOURCE}/styles/**/**/*.scss`, 'styles');
  gulp.watch(`${SOURCE}/scripts/**/*.js`, 'scripts');
});

gulp.task('assets', ['fonts', 'images']);


gulp.task('clean', (cb) => {
  del([DESTINATION], cb);
});
