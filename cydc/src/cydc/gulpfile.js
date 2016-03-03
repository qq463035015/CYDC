/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var paths = {
    webroot: "./wwwroot/",
    jsDest: "./wwwroot/lib/bundle",
    cssDest: "./wwwroot/css/bundle",

    bundleJs: [],
    bundleCss: []
};

paths.bundleJs = [
    paths.webroot + "../bower_components/angular/angular",
    paths.webroot + "../bower_components/angular-animate/angular-animate",
    paths.webroot + "../bower_components/angular-route/angular-route",
    paths.webroot + "../bower_components/angular-aria/angular-aria",
    paths.webroot + "../bower_components/angular-messages/angular-messages",
    paths.webroot + "../bower_components/angular-material/angular-material",
    paths.webroot + "../bower_components/angular-material-data-table/dist/md-data-table",
    paths.webroot + "../bower_components/moment/min/moment.min.js"
];

paths.bundleCss = [
    paths.webroot + "../bower_components/angular/angular-csp.css",
    paths.webroot + "../bower_components/angular-material/angular-material",
    paths.webroot + "../bower_components/angular-material-data-table/dist/md-data-table"
];

gulp.task("clean:js", function (cb) {
    rimraf(paths.jsDest + "*.js", cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.cssDest + "*.css", cb);
});

gulp.task("bundle:js", function () {
    var files = paths.bundleJs.map(function (file) {
        if (/^.+\.js$/.test(file)) return file;
        return file + ".js";
    });
    var dest = paths.jsDest + ".js";
    return gulp.src(files, { base: "." })
        .pipe(concat(dest))
        .pipe(gulp.dest("."));
});

gulp.task("bundle:minJs", function () {
    var files = paths.bundleJs.map(function (file) {
        if (/^.+\.js$/.test(file)) return file;
        return file + ".min.js";
    });
    var dest = paths.jsDest + ".min.js";
    return gulp.src(files, { base: "." })
        .pipe(concat(dest))
        .pipe(gulp.dest("."));
});

gulp.task("bundle:css", function () {
    var files = paths.bundleCss.map(function (file) {
        if (/^.+\.css$/.test(file)) return file;
        else return file + ".css";
    });
    var dest = paths.cssDest + ".css";
    return gulp.src(files)
        .pipe(concat(dest))
        .pipe(gulp.dest("."));
});

gulp.task("bundle:minCss", function () {
    var files = paths.bundleCss.map(function (file) {
        if (/^.+\.css$/.test(file)) return file;
        return file + ".min.css";
    });
    var dest = paths.cssDest + ".min.css";
    return gulp.src(files)
        .pipe(concat(dest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("bundle", ["bundle:js", "bundle:minJs", "bundle:css", "bundle:minCss"]);

gulp.task("all", ["clean", "bundle"])