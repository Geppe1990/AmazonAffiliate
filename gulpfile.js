const gulp = require("gulp");
const del = require("del");
const flatmap = require("gulp-flatmap");
const lazypipe = require("lazypipe");
const rename = require("gulp-rename");
const header = require("gulp-header");
const packageJson = require("./package.json");

// Scripts
const eslint = require("gulp-eslint");
const concat = require("gulp-concat");
const uglify = require("gulp-terser");
const babel = require("gulp-babel");

// Styles
const sass = require("gulp-sass");

const paths = {
	input: "src/",
	output: "dist/",
	scripts: {
		input: "src/js/*",
		polyfills: ".polyfill.js",
		output: "dist/js/"
	},
	styles: {
		input: "src/sass/**/*.{scss,sass}",
		output: "dist/css/"
	}
};

const banner = {
	main:
		"/*!" +
		" <%= package.name %> v<%= package.version %>" +
		" | (c) " + new Date().getFullYear() + " <%= package.author.name %>" +
		" | <%= package.license %> License" +
		" | <%= package.repository.url %>" +
		" */\n"
};

gulp.task("build-css", function() {
	let files = [
		paths.styles.input,
	];

	return gulp.src(files)
		.pipe(header(banner.main, {package: packageJson}))
		.pipe(sass({
			outputStyle: "expanded",
			sourceComments: true
		}))
		.pipe(gulp.dest(paths.styles.output));
});

gulp.task("build-js", function() {
	let files = [
		paths.scripts.input,
	];

	return gulp.src(files)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
		.pipe(babel({
			presets: ["@babel/env"]
		}))
		.pipe(uglify())
		.pipe(header(banner.main, {package: packageJson}))
		.pipe(gulp.dest(paths.scripts.output));
});

gulp.task("start", gulp.series("build-css", "build-js"));

gulp.task("watch", function(){
	gulp.watch("src/sass/*.scss", gulp.series("build-css")),
	gulp.watch("src/js/*.js", gulp.series("build-js"));
});
