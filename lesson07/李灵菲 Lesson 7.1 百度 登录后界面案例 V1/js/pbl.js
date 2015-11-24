var heightArr = []; //存放每一列图片高度数组
var minHeight; //定义最小高度
var minIndex; //定义最小高度索引值
var loadtimes=0;

var imgJson = { //加载json对象
	src: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg'],
	title: ['牛奶鹏25元代金券', '美联社178套餐', '欢乐谷万圣节周末夜', '七欣天88波格力蟹', '陈兴记生煎20元代金券', '鱼你来', '香草香草', '折扣', '曼陀铃', '代金券', '奶茶代金', '永和豆浆', '山林', '衣服'],
	label: ['¥25', '¥178', '¥85', '¥58', '¥15.8', '¥158', '¥56', '¥189', '¥78', '¥66', '¥98', '¥28', '¥38', '¥98']
};

$(window).on('load', function() { //文档加载完毕后 创建图片
	infiniteLoad();       //调用图片创建
	setInterval(function() { //调用图片定位函数
		imgLocation();
	}, 200);
});

$(window).on('scroll', function() { //当滚动条到达最后一张图片顶上时加载图片
	if ($(window).scrollTop() > $('.outer-box').last().offset().top - $(window).height()) {
		if(loadtimes<5){infiniteLoad();loadtimes++};
	}
});

//无限加载图片函数
function infiniteLoad() {
	$(imgJson.src).each(function(index) { //循环json对象创建单张图片的dom结构
		var outerbox = $("<div>").addClass("outer-box").appendTo($(".container"));
		var box = $("<div>").addClass("box").appendTo(outerbox);
		var img = $('<img>').attr("src", "img/pbl/" + imgJson.src[index]).appendTo(box); //json src
		var desc = $("<div>").addClass("pic-describe").appendTo(box);
		var p1 = $('<p>').appendTo(desc);
		var a1 = $("<a class='pic-title' href='javascript:;'></a>").html(imgJson.title[index]).appendTo(p1); //json title
		var p2 = $('<p>').appendTo(desc);
		var span = $('<span>').addClass("label").html("价格:").appendTo(p2);
		$("<a class='label-name' href='javascript:;'></a>").html(imgJson.label[index]).appendTo(p2); //json label
	});
	imgLocation();     //dom结构创建后调用图片定位函数
}

//图片定位函数
function imgLocation() {
	var countNum = getColNum(); //获得图片列数
	var boxEles = document.querySelectorAll(".outer-box");
	for (var i = 0; i < boxEles.length; i++) {
		if (i < countNum) { //索引小于列数时
			heightArr[i] = boxEles[i].offsetHeight;          //将第一排的高度存到高度数组中
			$(boxEles[i]).css({                              //静态定位 去除浮动
				'position': 'static',
				'float': 'left'
			});
		} else {
			minHeight = Math.min.apply(null, heightArr); //获取第一排图片容器最小高度
			$(heightArr).each(function(index, value) { //此处循环遍历数组，拿到最小值的索引后即return,避免每次相同高度下取到的索引不同
				if (value == minHeight) {
					minIndex = index;
					return;
				}
			});
			var miniLeft = boxEles[minIndex].offsetLeft;               //图片距左为最小高度列的left
			var miniTop = minHeight;                                    //图片距顶为minHeight
			$(boxEles[i]).css({
				'position': 'absolute',                             //设置绝对定位与坐标
				'left': miniLeft,
				'top': miniTop
			});
			heightArr[minIndex] += boxEles[i].offsetHeight;          //最小高度列加上新的图片高度，以重新计算最小高度列
		}
	}
}

//求图片列数函数
function getColNum() {
	var w = $(window).width(); //通过窗口宽度判断图片列数，
	if (w < 974) { //此处注意须计算图片 间距与边框的大小
		countNum = 4;
	}
	if (w > 974) {
		countNum = 5;
	}
	return countNum;
}
