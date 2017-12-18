const gulp = require('gulp');
const connect = require('gulp-connect'); //Runs a local dev server
const open = require('gulp-open'); //Open a URL in a web browser
const browserify = require('browserify'); // Bundles JS
const source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
const concat = require('gulp-concat'); //Concatenates files
const sass = require('gulp-sass');
const lint = require('gulp-eslint'); //Lint JS files, including JSX
const historyApiFallback = require('connect-history-api-fallback'); //Load index.html regardless of what's in the URL

const config = {
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
    css: './src/**/*.scss',
		images: './src/images/*',
		mainJs: './src/index.js',
    dist: './dist'
	}
}

//Start a local development server
gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		middleware: function(connect, opt) {
			return [ historyApiFallback() ];
		},
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('open', ['connect'], function() {
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('js', function() {
	browserify(config.paths.mainJs)
		.transform("babelify", {presets: ["react", "es2015"]})
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('all.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('scss', function() {
	gulp.src(config.paths.css)
    .pipe(sass().on('error', sass.logError))
		.pipe(concat('all.css'))
		.pipe(gulp.dest(config.paths.dist + '/scss'));
});

gulp.task('images', function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js']);
  gulp.watch(config.paths.css, ['scss']);
});

gulp.task('default', ['html', 'js', 'scss', 'images', 'open', 'watch']);
