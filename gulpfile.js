/*
 * Install:Command to prepare in advance
 *   $ npm i -D install
 * Usage:
 *   $ npx gulp
 * */
const gulp     = require('gulp');
const gs = require('gulp-sass');
const minimist = require('minimist'); 
const gap = require('gulp-autoprefixer');
const sourcemaps = require("gulp-sourcemaps"); 
const imagemin = require('gulp-imagemin');

const options = minimist(process.argv.slice(2), {
	string: 'env',
	default: {
		env: '.' //Initial value of argument
	}
});
const dn = options.env;

gulp.task('default', () => {
  return gulp.watch('sass/**/**.scss', () => {
    return gulp.src('sass/style.scss')
      .pipe(sourcemaps.init())  
      .pipe(gs({
        outputStyle: 'expanded',
      }).on('error', gs.logError))
      .pipe(gap(['last 3 versions', 'ie >= 8', 'Android >= 4', 'iOS >= 8']))
      .pipe(sourcemaps.write("./maps/"))
      .pipe(gulp.dest('css'));
  });
});

//if you used git worktree you should use this
//npx gulp sass --env <worktree dir name>
gulp.task("sass", function() {
  return (
    gulp
      .src(dn + '/sass/style.scss')
      .pipe(sourcemaps.init())  
      .pipe(gs({
        outputStyle: 'expanded',
      }).on('error', gs.logError))
      .pipe(sourcemaps.write(dn + '/maps/'))
      .pipe(gulp.dest(dn + '/css'))
  );
}); 

const options = minimist(process.argv.slice(2), {
	string: 'env',
	default: {
		env: '.' // 引数の初期値
	}
});
const dn = options.env;
 
const paths = {
  srcDir : 'image/origin',
  dstDir : 'image/optimized'
}
 
gulp.task( 'imagemin', function(){
  const srcGlob = paths.srcDir + '/**/*.+(jpg|jpeg|png|gif|svg)';
  const dstGlob = paths.dstDir;
  const imageminOptions = {
    optimizationLevel: 7
  };
 
  gulp.src( srcGlob )
    .pipe(imagemin( imageminOptions ))
    .pipe(gulp.dest( dstGlob ));
});