//@common.js
//@require jquery.min.js

function TabFactory() {};    //选项卡工厂
TabFactory.prototype = {
	init: function(args) {    //执行子类方法
		this.TabEvent(args);
	},
	TabEvent: function() {
		err('parent TabEvent is Unsupported!')
	}
}

function NormalTab(){};    //普通选项卡类,可选择切换子页
extend(NormalTab,TabFactory);
NormalTab.prototype.TabEvent = function(args) {     //传入json对象参数 
	var me=this;
	me.wrap = args.wrap;  //选项卡父容器名
	me.subCls = args.subCls;   //内容页类名
	me.eventType = args.eventType || 'click';    //事件类型
	me.cb = args.callback;        //回调
	me.firstTag = document.querySelector(me.wrap).children[0].tagName;  //获得第一个子标签名
	me.eles = $(me.wrap + '>' + me.firstTag);        //获得选项卡子元素
	me.eles.each(function(index, value) {            
		$(value).on(me.eventType, function() {      //子元素事件
			me.eles.removeClass('active');          //修改选项卡样式
			$(this).addClass('active');
			if (me.subCls) {
				$(me.subCls).hide();              //如果加入了内容参数 执行此段
				$(me.subCls).eq(index).show();    
			}
			if (me.cb) {                           //执行回调
				me.cb(index);
			}
		})
	})
}

//鼠标划过显示函数封装 参数为按钮 显示内容类名
function HoverTab(){};
extend(HoverTab,TabFactory);
HoverTab.prototype.TabEvent = function(args) {
	var me=this;
	me.btn = args.btn;                    //按钮
	me.subWrap = args.subWrap;            //子页父类
	$(me.btn + ',' + me.subWrap).hover(function() {
		clearTimeout(me.timer);    //清除定时器
		$(me.subWrap).show();
	}, function() {
		me.timer = setTimeout(function() { //创建定时器，为了移出的时候不会立即消失内容区
			$(me.subWrap).hide();
		}, 200)
	})
}


function HistoryTab(){};              //历史记录按钮
extend(HistoryTab,TabFactory);         //继承自选项卡工厂
HistoryTab.prototype.TabEvent=function(args){
	var me=this;
	me.btn=args.btn;
	me.subWrap=args.subWrap;
	me.historyContent=$(me.subWrap);
	$(me.btn).click(function(){
		me.historyContent.show();
	})
	.blur(function(){
		me.historyContent.hide();
	})
}

var BackToTop=function(btn,scrolltime){    //返回顶部函数
	var me=this;
	me.btn=$(btn);
	me.scrolltime=scrolltime || 400;
	me.btn.click(function(){
		$('body,html').animate({ //scrolltop动画执行
			scrollTop: '0'
		}, me.scrolltime);
	})
}


//fis自动构建资源定位函数 ，编译返回绝对路径，编译后此函数失效
function __uri(url) {
	return 'static/' + url.substring(3);
}

function extend(subClass,ParentClass) { //继承父类函数(不带参数的父类)
	var F=function(){};
	F.prototype=ParentClass.prototype;
	subClass.prototype=new F();
	subClass.prototype.constructor=subClass;
}

function log(info) { //调试用函数
	return console.log(info);
}

function err(errorInfo) { //抛错函数
	throw new Error(errorInfo);
}