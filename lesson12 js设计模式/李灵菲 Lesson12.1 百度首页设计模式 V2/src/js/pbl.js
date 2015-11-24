//@pbl.js
//@require jquery.min.js

//瀑布流效果面向对象

var Flow = function() {
	var me = this;      //缓存this
	me.heightArr = []; //存放每一列图片高度数组
	me.loadtimes = 0;   //载入次数
	me.minHeight=0;    //图片最小高度
	me.maxHeight=0;    //图片最大高度
}

Flow.prototype = {
	init: function(container,imgJson) {   //初始化
		var me = this;
		me.container=container;
		me.imgJson = imgJson;    //获得图片json
		me.infiniteLoad();       //加载infiniteLoad()
		setInterval(function() { //调用图片定位函数
			me.imgLocation();
		}, 200);
		me.scrollEvent();
	},
	imgLocation: function() {
		var me = this;
		me.countNum=me.getColNum();
		var boxEles = document.querySelectorAll(".outer-box");
		for (var i = 0; i < boxEles.length; i++) {
			if (i < me.countNum) { //索引小于列数时
				me.heightArr[i] = boxEles[i].offsetHeight; //将第一排的高度存到高度数组中
				$(boxEles[i]).css({ //静态定位 去除浮动
					'position': 'static',
					'float': 'left'
				});
			} else {
				me.minHeight = Math.min.apply(this, me.heightArr); //获取第一排图片容器最小高度
				
				$(me.heightArr).each(function(index, value) { //此处循环遍历数组，拿到最小值的索引后即return,避免每次相同高度下取到的索引不同
					if (value == me.minHeight) {
						me.minIndex = index;
						return;
					}
				});
				var miniLeft = boxEles[me.minIndex].offsetLeft; //图片距左为最小高度列的left
				var miniTop = me.minHeight; //图片距顶为minHeight
				$(boxEles[i]).css({
					'position': 'absolute', //设置绝对定位与坐标
					'left': miniLeft,
					'top': miniTop
				});
				me.heightArr[me.minIndex] += boxEles[i].offsetHeight; //最小高度列加上新的图片高度，以重新计算最小高度列
			}
		}
	},
	getColNum: function() {
		var me = this;
		var w = $(window).width(); //通过窗口宽度判断图片列数，
		if (w < 974) { //此处注意须计算图片 间距与边框的大小
			me.countNum = 4;
		}
		if (w > 974) {
			me.countNum = 5;
		}
		return me.countNum;
	},
	infiniteLoad: function() {
		var me = this;
		$(me.imgJson.src).each(function(index) { //循环json对象创建单张图片的dom结构
			var outerbox = $("<div>").addClass("outer-box").appendTo($(me.container));
			var box = $("<div>").addClass("box").appendTo(outerbox);
			var img = $('<img>').attr("src", me.imgJson.src[index]).appendTo(box); //json src
			var desc = $("<div>").addClass("pic-describe").appendTo(box);
			var p1 = $('<p>').appendTo(desc);
			var a1 = $("<a class='pic-title' href='javascript:;'></a>").html(me.imgJson.title[index]).appendTo(p1); //json title
			var p2 = $('<p>').appendTo(desc);
			var span = $('<span>').addClass("label").html("价格:").appendTo(p2);
			$("<a class='label-name' href='javascript:;'></a>").html(me.imgJson.label[index]).appendTo(p2); //json label
		});
		me.imgLocation(); //dom结构创建后调用图片定位函数
	},
	scrollEvent: function() {           //页面滚动事件
		var me = this;
		$(window).on('scroll', function() { //当滚动条到达最后一张图片顶上时加载图片
			if ($(window).scrollTop() > $('.outer-box').last().offset().top - $(window).height()) {
				if (me.loadtimes < 5) {   //限定加载5次
					me.infiniteLoad();
					me.loadtimes++;
				}
			}
		});
	}

}

