//路由模块引入
var express = require('express');      
var homeRouter = express.Router();          //加载express 路由模块
var model =require('../model/db');          //加载数据库模块
            

homeRouter.get('/', function(req, res, next) {     //主路径访问前台首页
		res.status(200);
		res.render('./home/index');                  //渲染前台首页模版
});

homeRouter.get('/type/:typeid',function(req,res,next){     
	model.list.find({news_type_id:req.params.typeid},function(err,data){   //通过typeid索引查找list内容
		res.json(data); 
	})
});

module.exports = homeRouter;
