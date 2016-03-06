import gulp from 'gulp';
import path from 'path';
import del from 'del';
import { SOURCE, DESTINATION } from './settings';

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
    .pipe(gulp.dest(dist + 'js/'))
    .pipe($.size({ title : 'js' }))
    .pipe($.connect.reload());
});

gulp.task('jade', () => {
});

gulp.task('watch', () => {
});


gulp.task('clean', (cb) => {
  del([dist], cb);
});
