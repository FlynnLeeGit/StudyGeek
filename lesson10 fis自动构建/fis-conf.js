fis.match('::package', {                          //引入雪碧图与postpackager-loader插件
	spriter: fis.plugin('csssprites'),
	postpackager: fis.plugin('loader')
})


fis.match('*.{png,gif,ttf,jpg,js,css}', { //所有图片 字体 js css引入md5尾缀
	useHash: true
})

fis.match('style.css', { //style样式中合成雪碧图
	useSprite: true
})

fis.match('*.png', {
	optimizer: fis.plugin('png-compressor') //使用png图片压缩
})

fis.match('*.js', {                            //js压缩合并
	packTo: '/static/js/aio.js',
	optimizer: fis.plugin('uglify-js'),
})

fis.match('*.css', {         
	packTo: 'static/css/aio.css',                //css压缩合并
    optimizer: fis.plugin('clean-css'),
})

fis.match('/static/lib/*.*', { //核心文件夹中的js或css无需压缩
	optimizer: null,
	packTo: null
})

fis.match('maps.json',{      //静态资源映射表放到conf文件夹中
	release:'conf/$0'
})

fis.set('project.ignore',  ['node_modules/**', 'output/**', '.git/**', 'fis-conf.js','readme.txt','/.idea/**']);  
//忽略的文件 项目说明插件目录 开发工具的临时文件等
