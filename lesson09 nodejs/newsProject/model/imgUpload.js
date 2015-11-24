var fs = require('fs'); //加载文件处理模块

//图片上传函数模块导出
module.exports = function(obj) { //此处传入的参数为req.files.字段名称  
	if (obj.name) {
		var size = parseInt(obj.size / (1024 * 1024)); //获取文件大小,转到单位mb
		var type = '.' + obj.type.split('/')[1]; //获取文件后缀名
		var strAll = ".jpeg.png.gif.bmp"; //允许的文件后缀名
		var d = new Date();
		var newImgName = d.toLocaleDateString() + " " + parseInt(d.getTime() / 1000) + type; //新的图片命名格式是日期 加上时间戳
		if (size > 1) { //判断文件大小
			return {
				'error': '1',
				'error_info': '大小超过1m'
			};
		} else if (strAll.indexOf(type) < 0) { //判断是否是合法的格式后缀
			return {
				'error': '2',
				'error_info': '格式不正确！'
			};
		} else {
			fs.rename(obj.path, './public/image/front/newslist/' + newImgName, function(err) {
				if (err) throw err;
			});
			return {
				'error': '',
				news_img: newImgName //返回图片的新路径地址
			};
		}
	} else {
		return { //name为空时
			'error': '3',
			'error_info': '没有图片传入哦'
		};
	}
};