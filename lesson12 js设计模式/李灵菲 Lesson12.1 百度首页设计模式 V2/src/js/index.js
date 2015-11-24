//@index.js 
//@require common.js
$(document).ready(function() {
	var skinhovertab = new HoverTab(); //换肤按钮效果 HoverTab实例
	skinhovertab.init({
		btn: '#skinBtn',
		subWrap: '.skin-wrap'
	});

	var settingtab = new HoverTab(); //设置按钮效果 HoverTab实例
	settingtab.init({
		btn: '#settingBtn',
		subWrap: '.setting'
	});

	var morehovertab = new HoverTab(); //更多按钮效果 HoverTab实例
	morehovertab.init({
		btn: '#moreBtn',
		subWrap: '.more'
	});

	var accounthovertab = new HoverTab(); //个人中心按钮效果 HoverTab实例
	accounthovertab.init({
		btn: '#accountBtn',
		subWrap: '.account'
	});


	//选择皮肤事件 创建NormalTab实例
	var skintab = new NormalTab();
	skintab.init({
		wrap: '.skin-wrap',
		callback: function(index) { //回调
			var skinimgArr = [url(__uri('../img/bg/bg1.jpg')), url(__uri('../img/bg/bg2.jpg')), url(__uri('../img/bg/bg3.jpg')), url(__uri('../img/bg/bg4.jpg')), url(__uri('../img/bg/bg5.jpg'))];
			//		以上声明数组 图片路径可以被fis自动构建工具解析到
			var imageL = 'url(' + skinimgArr[index] + ') no-repeat center top';
			$('body').css('background', imageL)
				.css({
					'background-attachment': 'fixed',
					'background-size': 'cover'
				})
		}
	})

	//搜索框选中显示历史记录事件
	var searchtab = new HistoryTab();
	searchtab.init({
		btn: '#searchBox',
		subWrap: '.s-history'
	})

	//内容导航页选项卡切换  创建NormalTab实例
	var navtab = new NormalTab();
	navtab.init({
		wrap: '.c-tabs',
		subCls: '.sub-page'
	})

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

	//返回顶部按钮实例
	var backtop = new BackToTop('.back-top', 600);


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

	var imgJson = { //图片json对象 用于加载瀑布流
		src: [url(__uri('../img/pbl/1.png')), url(__uri('../img/pbl/2.png')), url(__uri('../img/pbl/3.png')), url(__uri('../img/pbl/4.png')), url(__uri('../img/pbl/5.png')), url(__uri('../img/pbl/6.png')), url(__uri('../img/pbl/7.png')),url( __uri('../img/pbl/8.png')), url(__uri('../img/pbl/9.png')),url(__uri('../img/pbl/10.png')), url(__uri('../img/pbl/11.png')), url(__uri('../img/pbl/12.png')), url(__uri('../img/pbl/13.png')), url(__uri('../img/pbl/14.png'))],
		title: ['牛奶鹏25元代金券', '美联社178套餐', '欢乐谷万圣节周末夜', '七欣天88波格力蟹', '陈兴记生煎20元代金券', '鱼你来', '香草香草', '折扣', '曼陀铃', '代金券', '奶茶代金', '永和豆浆', '山林', '衣服'],
		label: ['¥25', '¥178', '¥85', '¥58', '¥15.8', '¥158', '¥56', '¥189', '¥78', '¥66', '¥98', '¥28', '¥38', '¥98']
	};
	var flow = new Flow(); //创建瀑布流实例
	flow.init('.container',imgJson);    //瀑布流初始化 第一个参为加载的容器名 第二个为加载的图片json

});