var path = require('path');
var gulp = require('gulp');
var bower = require('bower');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var banner = require('gulp-banner');
var pkg = require('./package.json');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
var ngAnnotate = require('gulp-ng-annotate');
var filter = require('gulp-filter');
var minifyCss = require('gulp-minify-css');
var mainBowerFiles = require('main-bower-files');
var browserSyncSpa = require('browser-sync-spa');
var browserSync = require('browser-sync').create();
var proxyMiddleware = require('http-proxy-middleware');
var templateCache = require('gulp-angular-templatecache');

var comment = '/*\n' +
  ' * <%= pkg.name %> <%= pkg.version %>\n' +
  ' * <%= pkg.description %>\n' +
  ' * <%= pkg.homepage %>\n' +
  ' * --Developers--\n' +
  ' * <%= pkg.author %>\n' +
  ' * Copyright 2016 | Released under the <%= pkg.license %> license.\n' +
  '*/\n';

var paths = {
  build: './www',
  styles: ['./app/**/*.scss'],
  scripts: ['./app/**/*.js'],
  images: ['./app/images/**/*.{jpg,png,jpeg,svg,gif}'],
  templates: ['./app/**/*.html'],
  verifications: ['./app/verifications/**/*.html']
};


gulp.task('styles-app:dev', function (done) {
  return gulp.src('app/styles/app.scss')
    .pipe(sass({ includePaths: ['./styles'] }))
    .pipe(banner(comment, { pkg: pkg }))
    .pipe(gulp.dest(path.join(paths.build, '/styles')));
});

gulp.task('styles-app:dist', function (done) {
  return gulp.src('app/styles/app.scss')
    .pipe(sass({ includePaths: ['./styles'] }))
    .pipe(minifyCss({ keepSpecialComments: 0 }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(banner(comment, { pkg: pkg }))
    .pipe(gulp.dest(path.join(paths.build, '/styles')));
});

gulp.task('styles-vendor:dev', function (done) {
  return gulp.src(mainBowerFiles())
    .pipe(filter('**/*.css'))
    .pipe(concat('vendor.css'))
    .pipe(banner(comment, { pkg: pkg }))
    .pipe(gulp.dest(path.join(paths.build, '/styles')));
});

gulp.task('styles-vendor:dist', function (done) {
  return gulp.src(mainBowerFiles())
    .pipe(filter('**/*.css'))
    .pipe(concat('vendor.css'))
    .pipe(minifyCss({ keepSpecialComments: 0 }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(banner(comment, { pkg: pkg }))
    .pipe(gulp.dest(path.join(paths.build, '/styles')));
});

gulp.task('scripts-vendor:dev', function () {
  return gulp.src(mainBowerFiles())
    .pipe(filter('**/*.js'))
    .pipe(concat('vendor.js'))
    .pipe(banner(comment, { pkg: pkg }))
    .pipe(gulp.dest(path.join(paths.build, '/scripts')));
});

gulp.task('scripts-vendor:dist', function () {
  return gulp.src(mainBowerFiles())
    .pipe(filter('**/*.js'))
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(banner(comment, { pkg: pkg }))
    .pipe(gulp.dest(path.join(paths.build, '/scripts')));
});

gulp.task('scripts-app:dev', function () {
  return gulp.src(paths.scripts)
    .pipe(filter('**/*.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('app.js'))
    .pipe(banner(comment, { pkg: pkg }))
    .pipe(gulp.dest(path.join(paths.build, '/scripts')));
});

gulp.task('scripts-app:dist', function () {
  return gulp.src(paths.scripts)
    .pipe(filter('**/*.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(ngAnnotate())
    .pipe(concat('app.js'))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(uglify())
    .pipe(banner(comment, { pkg: pkg }))
    .pipe(gulp.dest(path.join(paths.build, '/scripts')));
});

gulp.task('templates:dev', function () {
  return gulp.src(paths.templates)
    .pipe(templateCache({ module: 'CardvisitApp' }))
    .pipe(gulp.dest(path.join(paths.build, '/scripts')));
});

gulp.task('templates:dist', function () {
  return gulp.src(paths.templates)
    .pipe(templateCache({ module: 'CardvisitApp' }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(uglify())
    .pipe(banner(comment, { pkg: pkg }))
    .pipe(gulp.dest(path.join(paths.build, '/scripts')));
});

gulp.task('inject:dev', ['scripts-vendor:dev', 'scripts-app:dev', 'styles-app:dev', 'templates:dev'], function () {
  return gulp.src('./app/index.html')
    .pipe(inject(gulp.src([
      paths.build + '/styles/vendor.css',
      paths.build + '/styles/app.css',
      paths.build + '/scripts/vendor.js',
      paths.build + '/scripts/app.js',
      paths.build + '/scripts/templates.js'
    ], { read: false }), { ignorePath: 'www' }))
    .pipe(gulp.dest('./www'));
});

gulp.task('inject:dist', ['scripts-vendor:dist', 'scripts-app:dist', 'styles-app:dist', 'templates:dist'], function () {
  return gulp.src('./app/index.html')
    .pipe(inject(gulp.src([
      paths.build + '/styles/vendor.min.css',
      paths.build + '/styles/app.min.css',
      paths.build + '/scripts/vendor.min.js',
      paths.build + '/scripts/app.min.js',
      paths.build + '/scripts/templates.min.js'
    ], { read: false }), { ignorePath: 'www' }))
    .pipe(gulp.dest('./www'));
});

gulp.task('fonts', function () {
  return gulp.src(mainBowerFiles())
    .pipe(filter('**/*.{woff,woff2,svg,ttf,otf,eot}'))
    .pipe(gulp.dest(path.join(paths.build, '/fonts')));
});

gulp.task('images', function () {
  return gulp.src(paths.images)
    .pipe(gulp.dest(path.join(paths.build, '/images')));
});

gulp.task('verifications', function () {
  return gulp.src(paths.verifications)
    .pipe(gulp.dest(path.join(paths.build, '/')));
});

gulp.task('gulpfile', function () {
  return gulp.src('gulpfile.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function (cb) {
  var del = require('del');
  return del('www/', cb);
});

gulp.task('browser-sync', ['gulpfile', 'scripts-vendor:dev', 'scripts-app:dev', 'templates:dev', 'styles-app:dev', 'fonts', 'images', 'inject:dev'], function () {
  browserSync.init({
    server: {
      baseDir: './www',
      middleware: proxyMiddleware('/api', {
        target: 'http://localhost:8080',
        changeOrigin: false,
        pathRewrite: {
          '^/api': '/'
        },
      })
    },
    notify: false
  });

  browserSync.use(browserSyncSpa({
    selector: '[ng-app]'
  }));
});

gulp.task('watch', function () {
  gulp.watch(paths.styles, ['styles-app:dev', browserSync.reload]);
  gulp.watch(paths.scripts, ['scripts-app:dev', browserSync.reload]);
  gulp.watch(paths.templates, ['templates:dev', browserSync.reload]);
  gulp.watch('bower.json', ['scripts-vendor:dev', 'fonts', browserSync.reload]);
  gulp.watch('gulpfile.js', ['gulpfile', browserSync.reload]);
});

gulp.task('dev', ['scripts-vendor:dev', 'scripts-app:dev', 'styles-app:dev', 'styles-vendor:dev', 'fonts', 'images', 'verifications', 'templates:dev', 'inject:dev', 'browser-sync', 'watch']);
gulp.task('dist', ['scripts-vendor:dist', 'scripts-app:dist', 'styles-app:dist', 'styles-vendor:dist', 'fonts', 'images', 'verifications', 'templates:dist', 'inject:dist']);

gulp.task('build', ['clean', 'gulpfile'], function () {
  if (gutil.env.production) {
    gulp.start('dist');
  } else {
    gulp.start('dev');
  }
});

gulp.task('default', ['build']);
