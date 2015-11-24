define (function(require, exports, module) {
	var $ = require('jquery');
	var common = require('common');

   
    x = 0; //定义主轮播动画的x轴偏移量
	var schoolX = 7 * 140; //定合作院校动画的x轴偏移量 

	var timer = setInterval(function() { //每3秒定时执行轮播动画
		autoAnimate();
		autoIndex();
	}, 3000);

	$('.lb').hover(function() { //悬停时暂停动画
		clearInterval(timer);
	}, function() {
		timer = setInterval(function() { //鼠标移出继续动画
			autoAnimate();
			autoIndex();
		}, 3000);
	});

	//轮播动画函数  
	function autoAnimate() {
		x += 568;
		$('.lb-wrap').animate({
			left: -x //注意x是负的
		}, 1000, function() { //动画执行后的回调，如果是第六张图片宽度 ，则设置为x为零
			if (x >= 568 * 5) {
				$('.lb-wrap').css('left', 0);
				x = 0;
			}
		});
	};
	//自动index函数  通过x变量自动设置标签页索引
	function autoIndex() {
		var tabIndex = parseInt(x / 568); //偏移量除以图片宽度获得标签索引值
		if (tabIndex == 5) { //为5其实表示第一张图，所以设为0
			tabIndex = 0;
		};
		$('.lb-tabs>li').removeClass('active'); //标签样式修改
		$('.lb-tabs>li').eq(tabIndex).addClass('active');
	};

    //			轮播箭头点击事件
	common.tabSwitch('.lb-arrow', 'click', function(index) { //调用选项卡函数 事件为单击
		index == 1 ? x += 568 : x -= 568; //index为1是右侧按钮 index为0是左按钮,为1则加，为0则减
		if (x > 568 * 4) { //右侧超限 定为第一张图片
			x = 0
		};
		if (x < 0) { //左侧超限定位第五张图片
			x = 568 * 4;
		}
		$('.lb-wrap').animate({ //点击动画
			left: -x
		}, 500);
		autoIndex(); //完毕后执行自动索引更新选项卡状态
	});
    
    //			轮播选项卡点击事件
	common.tabSwitch('.lb-tabs', 'click', function(index) {
		x = index * 568;
		$('.lb-wrap').animate({
			left: -x
		}, 500);
	})

	//			合作院校箭头点击事件
	common.tabSwitch('.school-arrow', 'click', function(index) {
		index == 1 ? schoolX += 140 : schoolX -= 140; //140为图片宽度

		$('.school-wrap').animate({
			'left': -schoolX
		}, 800, function() {
			if (schoolX >= 140 * (13 + 7)) { //位于最右侧的轮播判断
				$('.school-wrap').css('left', -(140 * 7));
				schoolX = 7 * 140;
			}
			if (schoolX <= 0) { //图片位于最左侧的轮播判断
				$('.school-wrap').css('left', -(140 * 13));
				schoolX = 13 * 140;
			}
		})
	});

	//		   推荐视频标签页 hover事件
	common.tabSwitch('.main-labels', 'mouseover', function(index) {
		var vsubEles = $('.subvideo');
		vsubEles.hide();
		vsubEles.eq(index).show();
	})


	//			侧边菜单hover事件
	common.tabSwitch('.aside', 'mouseover', function(index) {
		var submenuEles = $('.sub-menu');
		submenuEles.hide();
		$('.list-more').show(); //内容显示
		submenuEles.eq(index).show(); //三个多的列表显示
	});

	//			侧边菜单out事件
	$('.aside').mouseleave(function() {
		$('.sub-menu').hide(); //内容隐藏
		$('.list-more').hide(); //三个多的列表隐藏
	})

});