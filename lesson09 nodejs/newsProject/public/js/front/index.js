$(document).ready(function() {

	//闭包函数执行轮播开始--------------------
	(function(w, x) {
		$('.c-wrap img,.carousel').css('width', w); //给于轮播图片宽度为w
		$('.c-wrap,.carousel').css('height', w * 0.6); //高度为w的0.6倍

		setInterval(function() { //每隔两秒执行轮播
			carousel();
		}, 2000);

		//轮播函数	
		function carousel() {
			x += w; //使用jquery animate执行轮播动画
			$('.c-wrap').animate({
				'left': -x
			}, function() {
				if (x >= 3 * w) { //动画结束后判断是否是第三幅图片的left，如果是则归0
					$('.c-wrap').css('left', 0);
					x = 0;
				}
				autoTab(); //执行autoTab 轮播选项卡样式切换函数
			});
		}

		//轮播选项卡函数
		function autoTab() {
			var tabindex = parseInt(x / w);
			if (tabindex == 3) {
				tabindex = 0;
			}
			$('.c-tabs li').removeClass('active');
			$('.c-tabs li').eq(tabindex).addClass('active');
		}

	})(($(window).width() - (10 * 2)), 0) //w x 初始赋值 w为屏幕宽度减20 x是轮播div 的x轴偏移量为0
	//--------轮播闭包结束

	//初始ajax为第一个页面
	pageAjax(1);
	//切换百度新闻板块事件
	tabSwitch('.navbar', 'click', function(index) { //调用tabSwitch函数执行页面效果切换
		$('.subpage').hide();
		$('.subpage').eq(index).show();
		pageAjax(index+1);
	})


	//ajax实时获取页面新闻函数
	function pageAjax(i) {
		$('.loading-area').show(); //执行ajax前显示loading画面
		var page = $('.page' + i); //需要加入dom的父级别
		console.log(page);
		$.ajax({
			type: "get",
			url: "/type/" + i, //请求地址拼接为项目地址+newspage方法
			success: function(data) {
				page.html('');                      //清空page页
				for (var i = 0; i < data.length; i++) {                //dom结构加载
					var newsbox = $('<div>').addClass('news-box').appendTo(page);
					var newsimg = $('<div>').addClass('news-img').appendTo(newsbox);
					$('<img>').attr('src', '/image/front/newslist/' + data[i].news_img).appendTo(newsimg);
					var newsCon = $('<div>').addClass('news-con').appendTo(newsbox);
					$('<p>').addClass('grey fz16').html(data[i].news_title).appendTo(newsCon);
					$('<p>').addClass('news-desc fz12').html(data[i].news_content).appendTo(newsCon);
					$('<span>').addClass('news-time fz12').html(timeAfter(data[i].news_time)).appendTo(newsCon);
					$('<span>').addClass('news-label white').html(data[i].news_label.news_label_name).appendTo(newsCon);
				}
				$('.loading-area').hide();   //加载成功后loading动画消失
			},
			error: function() {
				alert('连接服务器失败');
			}
		});
	}

    //获取时间更新函数
	function timeAfter(t) {
		var d = new Date();
		var seconds = parseInt((d.getTime() - t)/1000);   //获得当前时间与数据库中事件戳的差异秒数
		var result;
		if (seconds > 86400) {
			result = Math.floor(seconds / 86400) + '天前';
		} else if (seconds > 3600) {
			result = Math.floor(seconds / 3600) + '小时前';
		} else if (seconds > 60) {
			result = Math.floor(seconds / 60) + '分钟前';
		} else {
			result = seconds + '秒前';
		}
		return result;
	}

});