import gulp from 'gulp';
import path from 'path';
import del from 'del';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import minifyCSS from 'gulp-minify-css';
import gulpSequence from 'gulp-sequence';
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
});

gulp.task('styles', () => {
  return gulp.src(`${STYLES}/main.scss`)
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.autoprefixer())
    .pipe($.rename('main.css'))
    .pipe(minifyCSS({keepBreaks:true}) )
    .pipe($.plumber.stop())
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

gulp.task('static', () => {
  gulp.src(`${SOURCE}/images/*.{jpg,png}`)
    .pipe($.imagemin({
      progressive: true
    }))
    .pipe(gulp.dest(`${DESTINATION}/assets/images`))

  gulp.src(`${SOURCE}/fonts/*.{eot,svg,ttf,woff}`)
    .pipe(gulp.dest(`${DESTINATION}/assets/fonts`))

  gulp.src(`${SOURCE}/svg/*.{eot,svg,ttf,woff}`)
    .pipe(gulp.dest(`${DESTINATION}/assets/svg`))
})

gulp.task('watch', () => {
  gulp.watch(`${SOURCE}/styles/**/**/*.scss`, ['styles']);
  gulp.watch(`${SOURCE}/scripts/**/*.js`, ['scripts']);
  gulp.watch(`${SOURCE}/views/**/*.jade`, ['jade']);
});

gulp.task("serve", (callback) => {
  // Start a webpack-dev-server
  var compiler = webpack(webpackConfig);

  new WebpackDevServer(compiler, {
    contentBase: DESTINATION
  }).listen(8080, "localhost", (err) => {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    $.util.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
  });
});

gulp.task('build', gulpSequence(['static', 'styles', 'jade', 'scripts']));
gulp.task('default', ['build', 'watch', 'serve']);

gulp.task('clean', (cb) => {
  del([DESTINATION], cb);
});
