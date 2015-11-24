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
	pageAjax(0);
	//切换百度新闻板块事件
	tabSwitch('.navbar', 'click', function(index) { //调用tabSwitch函数执行页面效果切换
		$('.subpage').hide();
		$('.subpage').eq(index).show();
		pageAjax(index);
	})


	//ajax实时获取页面新闻函数
	function pageAjax(i) {
		var typeArr = ['推荐', '百家', '本地', '娱乐', '军事'];
		$('.loading-area').show(); //执行ajax前显示loading画面
		$.ajax({
			type: "get",
			url: appPath + "/newspage", //请求地址拼接为项目地址+newspage方法
			data: {
				page: typeArr[i] //向服务器发送请求，并发送请求的板块代码
			},
			success: function(data) {
				$('.page' + (i + 1)).html(data); //获取到的dom数据添加进相应的子页面dom中
				$('.loading-area').hide(); //ajax成功后隐藏loading
			},
			error: function() {
				alert('连接服务器失败');
			}
		});
	}
});