var path = {
  dist: {
    html: 'dist/',
    js: 'dist/js/',
    css: 'dist/styles/',
    img: 'dist/images/',
    fonts: 'dist/fonts/'
  },
  src: {
    html: 'src/index.html',
    js: 'src/js/main.js',
    style: 'src/styles/style.scss',
    img: 'src/images/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  watch: {
    html: 'src/index.html',
    js: 'src/js/*.js',
    css: 'src/styles/styles.scss',
    img: 'src/images/*.*',
    fonts: 'srs/fonts/*.*'
  },
  clean: './dist/*'
};

var config = {
  server: {
    baseDir: './dist'
  },
  notify: false
};

var gulp = require('gulp'), 
  webserver = require('browser-sync'),
  sass = require('gulp-sass'), 
  cleanCSS = require('gulp-clean-css'), 
  uglify = require('gulp-uglify'), 
  rimraf = require('gulp-rimraf'),
  imagemin = require('gulp-imagemin');
  

/* Tasks */
gulp.task('webserver', function () {
  webserver(config);
});

//  html
gulp.task('html:build', function () {
  return gulp.src(path.src.html)
    .pipe(gulp.dest(path.dist.html)) 
    .pipe(webserver.reload({ stream: true }));
});

// styles
gulp.task('css:build', function () {
  return gulp.src(path.src.style)
    .pipe(sass())
    .pipe(gulp.dest(path.dist.css))
    .pipe(cleanCSS()) 
    .pipe(gulp.dest(path.dist.css))
    .pipe(webserver.reload({ stream: true }));
});

//  js
gulp.task('js:build', function () {
  return gulp.src(path.src.js) 
    .pipe(gulp.dest(path.dist.js))
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.js))
    .pipe(webserver.reload({ stream: true }));
});

// fonts
gulp.task('fonts:build', function () {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.dist.fonts));
});

// images
gulp.task('image:build', function () {
  return gulp.src(path.src.img) 
    .pipe(imagemin())
    .pipe(gulp.dest(path.dist.img));
});

// clean 
gulp.task('clean:build', function () {
  return gulp.src(path.clean, { read: false })
    .pipe(rimraf());
});


// Build
gulp.task('build',
  gulp.series('clean:build',
    gulp.parallel(
      'html:build',
      'css:build',
      'js:build',
      'fonts:build',
      'image:build'
    )
  )
);

// watch task
gulp.task('watch', function () {
  gulp.watch(path.watch.html, gulp.series('html:build'));
  gulp.watch(path.watch.css, gulp.series('css:build'));
  gulp.watch(path.watch.js, gulp.series('js:build'));
  gulp.watch(path.watch.img, gulp.series('image:build'));
  gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
});

// default
gulp.task('default', gulp.series(
  'build',
  gulp.parallel('webserver', 'watch')      
));