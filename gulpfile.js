'use strict';

var gulp = require('gulp');
var util = require('gulp-util');
var compass = require('gulp-compass');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

gulp.task('compass', function() {
    gulp.src('./app/public/css/sass/*.scss')
        pipe(compass({
            config_file: './app/public/css/config.rb',
            css: 'stylesheets',
            sass: 'sass',
        }))
        .pipe(gulp.dest('./app/public/css'));
});

gulp.task('webpack', function(callback) {
    webpack(webpackConfig, function(err, stats) {
        if (err) throw new util.PluginError('webpack', err);
        util.log('[webpack]', stats.toString({
            'msg': 'done',
        }));
        callback && callback();
    });
});

gulp.task('default', function() {
    gulp.run('webpack');
});

