var heightArr = []; //存放每一列图片高度数组
var minHeight; //定义最小高度
var minIndex; //定义最小高度索引值

var imgJson = { //加载json对象
	src: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg'],
	title: ['春卷', '蛋糕', '小面包', '爱心蛋糕', '美味', '炒饭', '杯子蛋糕', '小菜', '快来', '炒素', '好吃', '鲜美', '虾仁', '芝麻'],
	label: ['美食1', '美食2', '美食3', '美食4', '美食5', '美食6', '美食7', '美食8', '美食9', '美食10', '美食11', '美食12', '美食13', '美食14']
};


$(window).on('load', function() { //文档加载完毕后 创建图片
	tabSwitch();          //调用导航切换
	infiniteLoad();       //调用图片创建
	setInterval(function() { //调用图片定位函数
		imgLocation();
	}, 200);
});


$(window).on('scroll', function() { //当滚动条到达最后一张图片顶上时加载图片
	if ($(window).scrollTop() > $('.outer-box').last().offset().top - $(window).height()) {
		infiniteLoad();
	}
});

//无限加载图片函数
function infiniteLoad() {
	$(imgJson.src).each(function(index) { //循环json对象创建单张图片的dom结构
		var outerbox = $("<div>").addClass("outer-box").appendTo($(".container"));
		var box = $("<div>").addClass("box").appendTo(outerbox);
		var img = $('<img>').attr("src", "img/" + imgJson.src[index]).appendTo(box); //json src
		var desc = $("<div>").addClass("pic-describe").appendTo(box);
		var p1 = $('<p>').appendTo(desc);
		var a1 = $("<a class='pic-title' href='javascript:;'></a>").html(imgJson.title[index]).appendTo(p1); //json title
		var p2 = $('<p>').appendTo(desc);
		var span = $('<span>').addClass("label").html("标签:").appendTo(p2);
		var a2 = $("<a class='label-name' href='javascript:;'></a>").html(imgJson.label[index]).appendTo(p2); //json label
	})
	imgLocation();     //dom结构创建后调用图片定位函数
};

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
			var left = boxEles[minIndex].offsetLeft;               //图片距左为最小高度列的left
			var top = minHeight;                                    //图片距顶为minHeight
			$(boxEles[i]).css({
				'position': 'absolute',                             //设置绝对定位与坐标
				'left': left,
				'top': top
			});
			heightArr[minIndex] += boxEles[i].offsetHeight;          //最小高度列加上新的图片高度，以重新计算最小高度列
		}
	}
}

//求图片列数函数
function getColNum() {
	var w = $(window).width(); //通过窗口宽度判断图片列数，
	if (w <= (480 - (16 + 2))) { //此处注意须计算图片 间距与边框的大小
		countNum = 2;
	}
	if (w > (480 - (16 + 2))) {
		countNum = 3;
	}
	if (w > (768 - (16 + 2))) {
		countNum = 4;
	}
	if (w > (992 - (16 + 2))) {
		countNum = 5;
	}
	return countNum;
}


//菜单切换函数
function tabSwitch(){
	var tab=$(".banner>a");
	var listIndex;
	tab.each(function(index,value){
		if($(this).hasClass("active")){
			listIndex=index;
		};
		
		$(this).click(function(){
			 tab.eq(listIndex).removeClass("active");
             $(this).addClass("active");
             listIndex=index;
		})
	})
}

