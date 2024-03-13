const gulp = require("gulp");
const { series, parallel, dest } = require("gulp");
const cssnano = require("gulp-cssnano");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const autoprefixer = require("gulp-autoprefixer");


function cssTask(done) {
	gulp.src(["./blocks/**/*.css","./style.css"])
		.pipe(autoprefixer())
		.pipe(concat("styles.css"))
		.pipe(cssnano())
		.pipe(
			rename(function (path) {
				if (!path.extname.endsWith(".map")) {
					path.basename += ".min";
				}
			})
		)
		.pipe(gulp.dest("./dist/"))
	done();
}

function htmlTask(done) {
	gulp.src('./index.html')
		.pipe(
			htmlmin({
				collapseWhitespace: true,
			})
		)
		.pipe(gulp.dest("./dist/"))
	done();
}

function jsTask(done) {
	gulp.src(["./src/js/project.js", "./src/js/alert.js"])
		.pipe(plumber({ errorHandler: notifier.error }))
		.pipe(
			babel({
				presets: ["@babel/env"],
			})
		)
		.pipe(concat("project.js"))
		.pipe(uglify())
		.pipe(
			rename({
				suffix: ".min",
			})
		)
		.pipe(gulp.dest("./dist/js"))
		.pipe(notifier.success("js"));
	done();
}

function imageminTask(done) {
	gulp.src("./img/**/*.+(png|svg|jpeg|jpg|webp)").pipe(imagemin()).pipe(gulp.dest("./dist/img/"));
	done();
}

// function watch(done) {
// 	gulp.watch([filespath.sass, filespath.html, filespath.js, filespath.images], gulp.parallel(["cssTask", "jsTask", "imageminTask"]));
// 	done();
// }




exports.cssTask = cssTask;
exports.htmlTask = htmlTask;
exports.imageminTask = imageminTask;
