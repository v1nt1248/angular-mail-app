"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const babel = require("gulp-babel");
const browserify = require("browserify");
const buffer = require("vinyl-buffer");
const source = require("vinyl-source-stream");
const uglify = require("gulp-uglify");
const browser = require("browser-sync");
//var sync = browser.create();
let reload = browser.reload;


gulp.task("html", function() {
	return gulp.src("./src/**/*.html")
		.pipe(gulp.dest("./public/"))
		.pipe(reload({stream:true}));
});

gulp.task("styles", function() {
	return gulp.src("./src/**/*.scss")
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("./public/"))
		.pipe(reload({stream:true}));
});

gulp.task("css", function() {
	return gulp.src("./src/**/*.{css,jpg,png,gif}")
		.pipe(gulp.dest("./public/"))
		.pipe(reload({stream:true}));
});

gulp.task("babel", function() {
	return gulp.src("./src/**/*.js")
		.pipe(sourcemaps.init())
		.pipe(babel({
			"plugins": [
				"transform-es2015-modules-commonjs",
				"transform-es2015-parameters"
			]
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("temp/"));
		// .pipe(gulp.dest(function(file) {
		// 	file.base = file.path;
		// 	return "temp/" + file.basename;
		// }));
});

gulp.task("browserify", function() {
	let b = browserify({
		entries: "./temp/main/index.js",
		debug: true
	});

	return b.bundle()
		.pipe(source("app.js"))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		// .pipe(uglify())
		// .on('error', gutil.log)
		.pipe(sourcemaps.write(''))
		.pipe(gulp.dest("./public/"))
		.pipe(reload({stream:true}));
});

gulp.task("clean", function() {
	return del(["public/**/*"]);
});

gulp.task("del-tmp", function() {
	return del(["./temp"]);
});

gulp.task("build", gulp.series("clean", "html", "styles", "css", "babel", "browserify", "del-tmp"));

gulp.task("browser", function() {
 browser({
	 server: {
		 baseDir: "./public"
	 },
	 port: 9000,
	 open: true,
	 notify: false
 });
});

gulp.task("run-app", gulp.series("build", "browser"));

gulp.task("watcher", function() {
	gulp.watch("./src/**/*.scss", gulp.series("styles"));
	gulp.watch("./src/**/*.css", gulp.series("css"));
	gulp.watch("./src/**/*.js", gulp.series("babel", "browserify", "del-tmp"));
	gulp.watch("./src/**/*.html", gulp.series("html"));
});

gulp.task("dev", gulp.series("build", gulp.parallel("watcher", "browser")));

gulp.task("help", function(callback) {
	var h = '\nПомощь:\n'+
		'1) "build"  - компилирует необходимые файлы из папки SRC и переносит все'+
		' в папку PUBLIC.\n'+
		'2) "run-app" - компилирует необходимые файлы из папки SRC, переносит все'+
		' в папку PUBLIC, "поднимает" локальный сервер (LOCALHOST:9000) и открывает'+
		' web-страницу приложения в браузере.\n'+
		'3) "dev" - запускает задачу BUILD, "поднимает" локальный сервер (LOCALHOST:9000),' +
		' открывает web-страницу приложения в браузере и затем отслеживает изменения,' +
		' вносимые в рабочие файлы.\n'+
		'4) "browser" - "поднимает" локальный сервер (LOCALHOST:9000)) и открывает '+
		' web-страницу приложения в браузере.\n'+
		'5) "default" ("help") выводит это сообщение\n';
	console.log(h);
	callback();
});

gulp.task("default", gulp.series("help"));