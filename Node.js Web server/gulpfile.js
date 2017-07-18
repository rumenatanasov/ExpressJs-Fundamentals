let gulp = require('gulp')
let htmlMin = require('gulp-html-minifier')

gulp.task('minify', function() {
    gulp.src('./views/*.html')
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
})