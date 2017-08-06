'use strict';

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var babel = require('gulp-babel');

//did not uncss and minify css files as need more time to figure out how not to break materialize.css as it wouldnt minify easily after materialize.js was minified - would need a bit more time to fix that.
gulp.task('default', function(){
    return gulp.src('js/collection_functions_module.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('build'));
});
      
gulp.task('js', function () {
   return gulp.src(['js/materialize.js', 'build/collection_functions_module.js','js/app.js'])
      .pipe(uglify())
      .pipe(concat('app.js'))
      .pipe(gulp.dest('build'));
});
