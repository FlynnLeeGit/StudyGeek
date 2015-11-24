//require模块引入
var express = require('express');
var path = require('path');           //引入path模块
var bodyParser = require('body-parser');    //请求body解析模块
var orm=require('orm');                      //orm模块 用于数据库处理
var multiparty=require('connect-multiparty');    //multiparty处理含文件上传的表单

var homeRouter = require('./routes/homeRouter');     //前台路由模块
var adminRouter = require('./routes/adminRouter');   //后台路由模块


var app = express();


//模版路径及引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//body parser解析设置
app.use(multiparty());    //使用multiparty
app.use(bodyParser.json());         
app.use(bodyParser.urlencoded({ extended: true}));

//设置静态资源目录
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/admin',adminRouter);


//入口app对象导出
module.exports = app;
//app.listen(3000);