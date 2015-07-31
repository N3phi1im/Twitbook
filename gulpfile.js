var gulp = require("gulp"),
	sass = require("gulp-ruby-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	rename = require("gulp-rename"),
	minifycss = require("gulp-minify-css"),
	notify = require("gulp-notify"),
	concat = require("gulp-concat"),
	livereload = require("gulp-livereload"),
	uglify = require("gulp-uglify"),
	beautify = require('gulp-beautify');


gulp.task('styles', function(){
	return sass('public/sass', { style: 'expanded' })
		.pipe(autoprefixer("last 2 versions"))
		.pipe(gulp.dest('public/css'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minifycss())
		.pipe(gulp.dest('public/css'))
		.pipe(notify({message:"SCSS Compiled"}));
});

gulp.task('scripts', function() {
	return gulp.src("public/javascript/**")
		.pipe(concat('jsBundle.js'))
		.pipe(beautify({indentSize: 4, indentChar : ' '}))
		.pipe(gulp.dest("public/bundles"))
		.pipe(rename({suffix: ".min"}))
		.pipe(uglify())
		.pipe(gulp.dest('public/bundles'))
		.pipe(notify({message:"Minified JS, And Bundled."}));
});

 

    

gulp.task('watch', function(){
	livereload.listen({ start: true});
	gulp.watch(['./**', 'views/*']).on('change', livereload.changed);
	gulp.watch('public/sass/*', ['styles']);
	gulp.watch('public/javascript/**', ['scripts']);
});






