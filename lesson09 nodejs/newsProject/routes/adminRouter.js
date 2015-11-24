//路由模块引入
var express = require('express');
var adminRouter = express.Router();

var model = require('../model/db'); //加载orm 数据库模块
var imgUpload = require('../model/imgUpload'); //加载图片上传处理 模块




//后台主页路由
adminRouter.get('/', function(req, res, next) {
	model.user.find({status: 1}, function(err, data) {    //先判断是否有用户登录
		if (err) throw err;
		if (data.length > 0) {
			model.list.find(['news_time', 'Z'], function(err, listAll) { //寻找所有记录并以时间为倒序排列
				if (err) throw err;
				res.status(200);
				res.render('./admin/index.ejs', {listAll, name:data[0].username})  //渲染后台主页模版
			})
		}else{
			res.redirect('/admin/login');
		}
	})
});


//登录页面路由
adminRouter.get('/login', function(req, res, next) {
	res.status(200);
	res.render('./admin/login.ejs');
});

//判断用户是否存在
adminRouter.get('/userAjax/:userid', function(req, res, next) {
	model.user.count({username: req.params.userid}, function(err, num) {   //寻找用户是否存在
		if (err) throw err;
		if (num > 0) {
			res.send('1')
		} else {
			res.send('0');
		}
	})
});


adminRouter.post('/userLogin', function(req, res, next) {
	model.user.find(req.body, function(err, data) {
		if (data.length > 0) {
			data[0].save({status:1},function(err){if (err) throw err;console.log('login status to 1')});   //保存登录状态
			res.redirect('/admin');
		} else {
			res.render('./admin/error.ejs', {
				error: '登录名称或者密码不正确！请重新登录',
				time: 2
			});
		}
	})
});


adminRouter.get('/logout', function(req, res, next) {
    model.user.find({status:1},function(err,data){
    	data[0].save({status:0},function(err){if (err) throw err;console.log('logout status to 0')});   //注销登录状态
    });
	
	res.redirect('/admin/login');
});


//编辑记录路由
adminRouter.get('/edit/:id', function(req, res, next) {
	model.list.find({
		id: req.params.id //寻找符合id的记录并返回
	}, function(err, data) {
		res.status(200);
		res.json(data); //推送给前台寻找到的记录信息
	})
});


//更新记录路由
adminRouter.post('/update', function(req, res, next) {
	var tmpimg = imgUpload(req.files.news_img); //以请求的文件列表作为参数 执行imgUpload函数 

	if (tmpimg.error == 1) {
		res.send('<script>parent.ajaxEdit(1);</script>'); //大小不正确
	} else if (tmpimg.error == 2) {
		res.send('<script>parent.ajaxEdit(2);</script>'); //格式不正确
	} else if (tmpimg.error == 3) { //未上传文件的处理 将原有的字段保存并添加到req.body中
		model.list.get(req.body.id, function(err, data) {
			if (err) throw err;
			req.body.news_img = data.news_img;
		})
	} else {
		req.body.news_img = tmpimg.news_img; //有新图片的表单,将图片路径传入
	}

	model.list.get(req.body.id, function(err, data) { //获得请求id的新闻数据
		if (err) throw err;
		req.body.news_time = new Date().getTime(); //更新事件戳
		data.save(req.body, function(err) { //更新数据  此处req.body正好是orm框架需要用的保存格式
			if (err) throw err;
			res.send('<script>parent.ajaxEdit(4);</script>');
		})
	})

});


//删除记录路由
adminRouter.get('/del/:id', function(req, res, next) {
	model.list.find({
		id: req.params.id
	}).remove(function(err) { //寻找删除条目
		if (err) throw err;
		res.status(200);
		res.send('ok'); //返回删除结果
	})
});


//添加记录路由
adminRouter.post('/add', function(req, res, next) {
	var tmpimg = imgUpload(req.files.news_img); //调用imgUpload函数返回信息对象
	if (tmpimg.error == 1) {
		res.send('<script>parent.ajaxAdd(1);</script>'); //大小过大
	} else if (tmpimg.error == 2) {
		res.send('<script>parent.ajaxAdd(2);</script>'); //格式不正确
	} else if (tmpimg.error == 3) {
		res.send('<script>parent.ajaxAdd(3);</script>'); //未选择文件
	} else {
		req.body.news_time = new Date().getTime(); //添加事件戳
		req.body.news_img = tmpimg.news_img; //
		model.list.create(req.body, function(err, data) { //创建记录 以req.body为传参
			res.send('<script>parent.ajaxAdd(4);</script>'); //添加成功
		})
	}
});

module.exports = adminRouter;