var gulp = require('gulp');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

//gulping while developing
gulp.task('merge', function(){
  gulp.src('./client/scripts/*.js')
      .pipe(concat('app.js'))
      .pipe(gulp.dest('./server/public/assets/scripts'));
  gulp.src('./client/scripts/factories/*.js')
      .pipe(concat('factories.js'))
      .pipe(gulp.dest('./server/public/assets/scripts'));
  gulp.src('./client/scripts/directives/*.js')
      .pipe(concat('directives.js'))
      .pipe(gulp.dest('./server/public/assets/scripts'));
  gulp.src('./client/scripts/controllers/*.js')
      .pipe(concat('controllers.js'))
      .pipe(gulp.dest('./server/public/assets/scripts'));
});

//creates uglified files
gulp.task('mergeAndUglify', function() {
  gulp.src('./client/scripts/*.js')
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./server/public/assets/scripts/'));

    gulp.src('./client/scripts/factories/*.js')
      .pipe(concat('factories.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./server/public/assets/scripts/'));

    gulp.src('./client/scripts/directives/*.js')
      .pipe(concat('directives.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./server/public/assets/scripts/'));

    gulp.src('./client/scripts/controllers/*.js')
      .pipe(concat('controllers.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./server/public/assets/scripts/'));

});

gulp.task('copy', function () {

  //ui calendar
  gulp.src('./bower_components/angular-ui-calendar/src/calendar.js')
      .pipe(gulp.dest('./server/public/vendors/'));

  //fullcalendar
  gulp.src('./bower_components/fullcalendar/dist/fullcalendar.min.js')
      .pipe(gulp.dest('./server/public/vendors/'));
  gulp.src('./bower_components/fullcalendar/dist/gcal.js')
      .pipe(gulp.dest('./server/public/vendors/'));
  gulp.src('./bower_components/fullcalendar/dist/fullcalendar.css')
      .pipe(gulp.dest('./server/public/vendors/'));

  //jquery
  gulp.src('bower_components/jquery/dist/jquery.min.js')
      .pipe(gulp.dest('./server/public/vendors/'));
  gulp.src('bower_components/jquery/dist/jquery.min.map')
      .pipe(gulp.dest('./server/public/vendors/'));


  //moment
  gulp.src('bower_components/moment/min/moment.min.js')
      .pipe(gulp.dest('./server/public/vendors/'));

  //angular
  gulp.src('./node_modules/angular/angular.min.js')
  .pipe(gulp.dest('./server/public/vendors/'));
  gulp.src('./node_modules/angular/angular.min.js.map')
  .pipe(gulp.dest('./server/public/vendors/'));

  //angular animate
  gulp.src('./node_modules/angular-animate/angular-animate.min.js')
  .pipe(gulp.dest('./server/public/vendors/'));
  gulp.src('./node_modules/angular-animate/angular-animate.min.js.map')
  .pipe(gulp.dest('./server/public/vendors/'));

  //angular route
  gulp.src('./node_modules/angular-route/angular-route.min.js')
  .pipe(gulp.dest('./server/public/vendors/'));
  gulp.src('./node_modules/angular-route/angular-route.min.js.map')
  .pipe(gulp.dest('./server/public/vendors/'));

  //ui grid
  gulp.src('./node_modules/angular-ui-grid/ui-grid.min.js')
  .pipe(gulp.dest('./server/public/vendors/'));
  gulp.src('./node_modules/angular-ui-grid/ui-grid.min.css')
  .pipe(gulp.dest('./server/public/vendors/'));

  //angular materials
  gulp.src('./node_modules/angular-material/angular-material.min.js')
  .pipe(gulp.dest('./server/public/vendors/'));
  gulp.src('./node_modules/angular-material/angular-material.min.css')
  .pipe(gulp.dest('./server/public/vendors/'));
  gulp.src('./node_modules/angular-aria/angular-aria.min.js')
  .pipe(gulp.dest('./server/public/vendors/'));
  gulp.src('./node_modules/angular-aria/angular-aria.min.js.map')
  .pipe(gulp.dest('./server/public/vendors/'));

  //css
  gulp.src('./client/styles/*.css')
  .pipe(gulp.dest('./server/public/assets/styles/'));

  gulp.src('./client/views/**/*.*')
  .pipe(gulp.dest('./server/public/assets/views/'));

});

//gulp.task('default',['copy', 'mergeAndUglify']);

gulp.task('default',['copy', 'merge']);

gulp.task('watch', function () {
  gulp.watch('./client/**/**/*.*', ['copy', 'mergeAndUglify']);
});

gulp.task('watchdev', function () {
  gulp.watch('./client/**/**/*.*', ['copy', 'merge']);
});
