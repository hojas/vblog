'use strict';

var gulp = require('gulp');
var util = require('gulp-util');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var compass = require('gulp-compass');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');


// build sass
gulp.task('compass', function() {
    gulp.src('./app/public/css/sass/**/*.scss')
        .pipe(compass({
            config_file: './app/public/css/config.rb',
            css: 'app/public/css/stylesheets',
            sass: 'app/public/css/sass'
        }));
});

// run webpack
gulp.task('webpack', function() {
    webpack(webpackConfig, function(err, stats) {
        if (err) throw new util.PluginError('webpack', err);
    });
});

gulp.task('default', ['compass', 'webpack'], function() {
    gulp.watch('./app/public/css/sass/**/*.scss', ['compass']);
});

