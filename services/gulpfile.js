"use strict";
var gulp = require("gulp");
var gutil = require("gulp-util");
var gulpSass = require('gulp-sass');
var gulpNotify = require('gulp-notify');
var gulpRename = require("gulp-rename");

var root = "./program/";
var dev = true;

var config = {
    sassFilesPath: root + "ui/aspect/modules/**/*.scss",
    sassFilesEntry: root + "ui/aspect/main.scss",
    sassfileName: dev ? 'main_dev.css' : 'main.css',
    sassFilesOutput: root + "ui/aspect/"
};

gulp.task('default', function () {
    gulp.watch(config.sassFilesPath, ['sass']);
    return gulp.start(['sass']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    gulp.src(config.sassFilesEntry)
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulpRename(config.sassfileName))
        .pipe(gulp.dest(config.sassFilesOutput))
        .pipe(gulpNotify({
            message: 'sass compiled: <%= file.relative %>',
            sound: false
        }));
});


