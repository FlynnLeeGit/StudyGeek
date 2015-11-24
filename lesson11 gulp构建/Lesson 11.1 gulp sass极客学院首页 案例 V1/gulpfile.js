var gulp = require('gulp'); //gulp引入
var sass = require('gulp-ruby-sass'); //sass编译插件
var cssmin = require('gulp-minify-css'); //css压缩插件
var concat = require('gulp-concat'); //合并插件
var browserify = require('gulp-browserify'); //node模块浏览器可用化插件
var uglify = require('gulp-uglify'); //js压缩插件
var rename = require('gulp-rename'); //重命名插件
var rev = require('gulp-rev'); //md5添加插件
var revCollector = require('gulp-rev-collector'); //路径替换
var clean = require('gulp-clean'); //删除文件插件
var imagemin = require('gulp-imagemin');

//sass编译 任务
gulp.task('sass', function() {
	return sass('scss/index.scss')
		.on('error', sass.logError)
		.pipe(gulp.dest('css'));
});


/////////////////
//开发环境任务


//删除之前已经生成的css合并文件任务
gulp.task('clean', ['sass'], function() {
	return gulp.src('css/all.css')
		.pipe(clean());
})

gulp.task('dev', ['clean'], function() { //生产环境配置
	gulp.src('css/*.css')
		.pipe(concat('all.css'))
		.pipe(gulp.dest('css'));

	gulp.src('js/index.js') //开发环境 编译browserify的js到当前目录下
		.pipe(browserify())
		.pipe(rename('bundle.js')) //重命名bundle.js
		.pipe(gulp.dest('js/'));
})

////////////////
//生产环境 


gulp.task('pro-clean', function() {
	return gulp.src('dist') //删除dist文件夹中的文件
		.pipe(clean());
})


gulp.task('rev', ['dev', 'pro-clean'], function() {
	gulp.src('img/**/*.{png,jpg}')
		.pipe(imagemin()) //图片压缩
		.pipe(rev()) //添加md5
		.pipe(gulp.dest('dist/img')) //发布
		.pipe(rev.manifest()) //路径映射表
		.pipe(gulp.dest('./rev/img')); //映射表到rev文件夹

	setTimeout(function() {
		gulp.src('css/all.css')
			.pipe(cssmin()) //css压缩
			.pipe(rev()) //添加md5码
			.pipe(gulp.dest('dist/css'))
			.pipe(rev.manifest()) //生成mainfest路径映射表
			.pipe(gulp.dest('./rev/css')); //映射表放到rev文件夹

		gulp.src('js/bundle.js')
			.pipe(uglify()) //js压缩
			.pipe(gulp.dest('dist/js')); //js发布
	}, 3000);
})

gulp.task('pro', ['rev'], function() {               //替换主页文件中的资源引用
	gulp.src(['./rev/**/*.json', 'index.html'])
		.pipe(revCollector({
			replaceReved: true,
			//		dirReplacements:{                   //取消此注释可替换css路径
			//			'css':'dist/css',
			//		}
		}))
		.pipe(gulp.dest('dist'))
})


gulp.task('revcss', function() {                    //修改css文件中的资源引用
	gulp.src(['./rev/**/*.json', './dist/css/*.css'])
		.pipe(revCollector())
		.pipe(gulp.dest('./dist/css'))
})