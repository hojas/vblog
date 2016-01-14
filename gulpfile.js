'use strict';

var fs            = require('fs');
var path          = require('path');
var gulp          = require('gulp');

var postcss       = require('gulp-postcss');
var autoprefixer  = require('autoprefixer');
var cssnext       = require('cssnext');
var precss        = require('precss');
var modules       = require('postcss-modules');
var inlineComment = require('postcss-inline-comment');
var cssnano       = require('cssnano');

var util          = require('gulp-util');
var webpack       = require('webpack');
var webpackConfig = require('./webpack.config');


gulp.task('css', function() {
    let processors = [
        autoprefixer({ browsers: ['last 2 versions'] }),
        cssnext,
        precss,
        inlineComment(),
        cssnano(),
    ];

    return gulp.src('./app/public/css/src/app.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./app/public/css/dest'));
});

// run webpack
gulp.task('webpack', function() {
    webpack(webpackConfig, function(err, stats) {
        if (err) throw new util.PluginError('webpack', err);
        util.log('[webpack]', stats.toString({}));
    });
});

gulp.task('default', ['css', 'webpack']);

