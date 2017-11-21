const gulp = require('gulp')
const sass = require('gulp-sass')

gulp.task('sass-admin', () => {
  gulp
    .src('./admin/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./admin/build/css'))
})

gulp.task('sass-public', () => {
  gulp
    .src('./public/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/build/css'))
})

gulp.task('sass', ['sass-admin', 'sass-public'])
gulp.task('sass-watch', () => {
  gulp.watch('./**/*.scss', ['sass'])
})
