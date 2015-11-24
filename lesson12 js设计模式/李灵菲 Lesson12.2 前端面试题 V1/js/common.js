function TabFactory() {}; //选项卡工厂
TabFactory.prototype = {
	init: function(args) { //执行子类方法
		this.TabEvent(args);
	},
	TabEvent: function() {
		err('parent TabEvent is Unsupported!')
	}
}

function NormalTab() {}; //普通选项卡类,可选择切换子页
extend(NormalTab, TabFactory);
NormalTab.prototype.TabEvent = function(args) { //传入json对象参数 
	var me = this;
	me.eles = $(args.btns); //获得选项卡元素集合
	me.subCls = args.subCls; //内容页类名
	me.active = args.active || 'active';
	me.eventType = args.eventType || 'click'; //事件类型
	me.cb = args.callback; //回调
	me.eles.each(function(index, value) {
		$(value).on(me.eventType, function() { //子元素事件
			me.eles.removeClass(me.active); //修改选项卡样式
			$(this).addClass(me.active);
			if (me.subCls) {
				$(me.subCls).hide(); //如果加入了内容参数 执行此段
				$(me.subCls).eq(index).show();
			}
			if (me.cb) { //执行回调
				me.cb(index, value);
			}
		})
	})
}

function Scroll(btns, scrolltime, targets) { //返回顶部函数
	var me = this;
	me.btns = $(btns);
	me.scrolltime = scrolltime || 400;
	me.targets = targets || 0;
	me.btns.each(function(index, value) {
		$(this).on('click', function() {
			sTop=me.targets ? $(me.targets).eq(index).offset().top-100 : 0;
			$('body,html').animate({ //scrolltop动画执行
				scrollTop: sTop     //跳转到制定元素的offsettop
			}, me.scrolltime);
		})
	})
}

function extend(subClass, ParentClass) { //继承父类函数(不带参数的父类)
	var F = function() {};
	F.prototype = ParentClass.prototype;
	subClass.prototype = new F();
	subClass.prototype.constructor = subClass;
}

function log(info) { //调试用函数
	return console.log(info);
}

function err(errorInfo) { //抛错函数
	throw new Error(errorInfo);
}