$(document).ready(function() {
	hoverShow('#skinBtn', '.skin-wrap'); //换肤按钮效果 调用通用的hoverShow函数
	hoverShow('#settingBtn', '.setting'); //设置按钮效果
	hoverShow('#moreBtn', '.more'); //更多按钮效果
	hoverShow('#accountBtn', '.account'); //个人中心按钮效果

	//选择皮肤事件 调用通用tabSwitch函数
	tabSwitch('.skin-wrap', 'click', function(index) {
		var imageL = 'url(img/bg/bg' + (index + 1) + '.jpg) no-repeat center top';
		$('body').css('background', imageL)
			.css({
				'background-attachment': 'fixed',
				'background-size': 'cover'
			})

	});

	//搜索框选中显示历史记录事件
	$('#searchBox').on('click', function() {
		if ($(this).attr('autofocus')) { //为了能够判定一开始的焦点事件,所以使用click而非focus事件
			$('.s-history').show();
		}
	})
		.on('blur', function() {
			$('.s-history').hide();
		});

	//内容导航页选项卡切换 调用通用tabSwitch函数
	tabSwitch('.c-tabs', 'click', function(index) {
		$('.sub-page').hide();
		$('.sub-page').eq(index).show();
	});

	// 内容区箭头按钮事件
	$('.dh-arrow-round').on('click', function() {
		showContent();
	});

	//显示子页过长内容的函数
	function showContent() {
		$('.sub3,.sub4,.sub5').css('overflow', 'visible'); //修改overflow属性 是隐藏内容显示
		$('.dh-arrow-round,.wheel-to-more').hide(); //隐藏箭头本身
		$('.back-top').show();
		$('.sub5').height('3130px');
	}



	//返回顶部按钮事件
	$('.back-top').on('click', function() {
		$('body,html').animate({ //scrolltop动画执行
			scrollTop: '0px'
		}, 400);
	});

	//页面滚动监听修改百度搜索框事件
	$(window).on('scroll', function() {
		if ($(this).scrollTop() > 185) { //滚动条离顶部只有185px时 将body的样式修改为after的样式
			$('.body').removeClass('body-before').addClass('body-after');
		} else {
			$('.body').removeClass('body-after').addClass('body-before');
		}
	})

		.on('mousewheel', function() {
			if ($(this).scrollTop() == 0) {
				showContent();
			}
		})
});