var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var useref = require('gulp-useref');
var imagemin  =require('gulp-imagemin');


gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: 'app'
      },
    })
})

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
});

gulp.task('ejs', function(){
  return gulp.src('app/views/*.ejs')
    .pipe(gulp.dest('dist'))
});

gulp.task('css', function(){
  return gulp.src('./app/public/css/*.css')
    .pipe(gulp.dest('dist/public/css'))
});

gulp.task('server', function(){
  return gulp.src('./server.js')
    .pipe(gulp.dest('dist'))
});

// gulp.task('images', function(){
//     return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
//     .pipe(imagemin({
//         interlaced: true
//       }))
//     .pipe(gulp.dest('dist/images'))
// });

gulp.task('default',gulp.parallel( 'useref', 'css', 'ejs', 'server'), function (){
    console.log('Building files....');
})

gulp.task('serve',gulp.parallel('default','browserSync'), function (){
    console.log('Building and serving files....');
})
