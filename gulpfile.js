'use strict';

var path          = require('path');

var gulp          = require('gulp');
var util          = require('gulp-util');
var rename        = require('gulp-rename');
var uglify        = require('gulp-uglify');

var minifyCss     = require('gulp-minify-css');
var compass       = require('gulp-compass');
var autoprefixer  = require('gulp-autoprefixer');

var webpack       = require('webpack');
var webpackConfig = require('./webpack.config');


// build sass
gulp.task('compass', function() {
    gulp.src('./app/public/css/sass/**/*.scss')
        .pipe(compass({
            project: path.join(__dirname, 'app/public/css'),
            css: 'stylesheets',
            sass: 'sass',
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 version'],
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest('stylesheets'));
});

// run webpack
gulp.task('webpack', function() {
    webpack(webpackConfig, function(err, stats) {
        if (err) throw new util.PluginError('webpack', err);
        util.log('[webpack]', stats.toString({}));
    });
});

gulp.task('default', ['compass', 'webpack'], function() {
    gulp.watch('./app/public/css/sass/**/*.scss', ['compass']);
});

