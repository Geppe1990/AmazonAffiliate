const gulp = require("gulp");
const rename = require("gulp-rename");
const header = require("gulp-header");
const packageJson = require("./package.json");
const sourcemaps = require("gulp-sourcemaps");

// Scripts
const eslint = require("gulp-eslint");
const uglifyJS = require("gulp-terser");
const babel = require("gulp-babel");

// Styles
const sass = require("gulp-sass");
const uglifyCSS = require("gulp-clean-css");

// Webpack
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const webpackConfig = require("./webpack.config.js");

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

gulp.task("js", () => {
	let files = [paths.scripts.input];

	return gulp.src(files)
		.pipe(webpackStream(webpackConfig), webpack);
});

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
		.pipe(gulp.dest(paths.styles.output))
		.pipe(rename({suffix: ".min"}))
		.pipe(uglifyCSS({compatibility: "ie11"}))
		.pipe(gulp.dest(paths.styles.output));
});

gulp.task("build-js", function() {
	let files = [paths.scripts.input];

	return gulp.src(files)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.results(results => {
			console.log(`Total Results: ${results.length}`);
			console.log(`Total Warnings: ${results.warningCount}`);
			console.log(`Total Errors: ${results.errorCount}`);
		}))
		.pipe(babel({
			presets: ["@babel/env"],
		}))
		.pipe(uglifyJS())
		.pipe(header(banner.main, {package: packageJson}))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(paths.scripts.output));
});

gulp.task("start", gulp.series("build-css", "build-js"));
gulp.task("watch", function(){
	gulp.watch("src/sass/*.scss", gulp.series("build-css")),
	gulp.watch("src/js/*.js", gulp.series("build-js"));
});
