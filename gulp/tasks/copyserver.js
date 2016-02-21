'use strict';

import config      from '../config';
import changed     from 'gulp-changed';
import gulp        from 'gulp';
import browserSync from 'browser-sync';

gulp.task('copyserver', function() {

  return gulp.src(config.copyserver.src)
    .pipe(changed(config.copyserver.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.copyserver.dest))
    .pipe(browserSync.stream({ once: true }));

});
